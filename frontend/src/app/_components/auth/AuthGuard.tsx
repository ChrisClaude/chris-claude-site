'use client';

import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Loader from '../Loader';
import { useAuth } from '@/_hooks/useAuth';
import { UserType } from '@/_lib/types/common.types';
import { logError } from '@/_lib/logging.utils';

type AuthGuardProps = {
  userType: UserType | UserType[];
  children: ReactNode;
  fallbackPath?: string;
  loadingComponent?: ReactNode;
};

export const AuthGuard: React.FC<AuthGuardProps> = ({
  userType,
  children,
  fallbackPath = '/',
  loadingComponent = <Loader />,
}) => {
  const allowedRoles = useMemo(
    () => (Array.isArray(userType) ? userType : [userType]),
    [userType],
  );
  const { status, userProfile, login, containsRoles, isFetchingUserProfile } =
    useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleAuth = async () => {
      try {
        switch (status) {
          case 'loading':
            return;

          case 'unauthenticated':
            // Store the intended destination before redirecting to login
            sessionStorage.setItem('returnUrl', pathname);
            login();
            return;

          case 'authenticated':
            if (isFetchingUserProfile) {
              return;
            }

            if (!userProfile) {
              throw new Error('User profile is undefined');
            }

            if (containsRoles(allowedRoles)) {
              setIsAuthorized(true);
              // Restore the intended destination after successful auth
              const returnUrl = sessionStorage.getItem('returnUrl');
              if (returnUrl && returnUrl !== pathname) {
                router.replace(returnUrl);
                sessionStorage.removeItem('returnUrl');
              }
              return;
            }

            // Redirect to fallback path if user is not authorized
            router.replace(fallbackPath);
            break;

          default:
            throw new Error(`Unexpected auth status: ${status}`);
        }
      } catch (error) {
        logError('AuthGuard error', 'AuthGuard', error);
        router.replace('/error');
      } finally {
        setIsLoading(false);
      }
    };

    handleAuth();
  }, [
    status,
    userProfile,
    allowedRoles,
    router,
    pathname,
    login,
    fallbackPath,
    containsRoles,
    isFetchingUserProfile,
  ]);

  // Show loading state
  if (
    isLoading ||
    status === 'loading' ||
    isFetchingUserProfile ||
    !isAuthorized
  ) {
    return loadingComponent;
  }

  // Render children only when authorized
  return <>{children}</>;
};

// HOC for wrapping components that need authentication
export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  userType: UserType | UserType[],
  options: Partial<Omit<AuthGuardProps, 'userType' | 'children'>> = {},
) => {
  return function WithAuthComponent(props: P) {
    return (
      <AuthGuard userType={userType} {...options}>
        <WrappedComponent {...props} />
      </AuthGuard>
    );
  };
};
