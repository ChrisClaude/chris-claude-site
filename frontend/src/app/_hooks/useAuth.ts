import { useSession } from 'next-auth/react';
import { useMemo, useCallback } from 'react';
import { NEXT_PUBLIC_TENANT_DOMAIN, AZURE_AD_B2C_TENANT_NAME } from '@/_config';
import { signIn, signOut } from 'next-auth/react';
import { UserSession } from '@/_lib/types/common.types';
import { useQuery } from '@apollo/client';
import { GET_ME } from '@/_lib/graphql/queries/user';
import { UserDto } from '@/_lib/graphql/types';
import { ROLES } from '@/_lib/enums/constant';

export type Profile = {
  id: string | undefined | null;
  name: string | undefined | null;
  email: string | undefined | null;
  userType: 'Customer' | 'Admin';
};

export const useAuth = () => {
  const { data, status } = useSession();

  const {
    data: meData,
    loading: isFetchingUserProfile,
    error: errorFetchingUserProfile,
  } = useQuery<{ me: UserDto }>(GET_ME, {
    skip: status !== 'authenticated',
  });

  const userProfile = meData?.me ?? null;

  const isUserSignedIn = useMemo(() => {
    return status === 'authenticated';
  }, [status]);

  const login = useCallback(() => {
    signIn('azure-ad-b2c', { prompt: 'login', callbackUrl: '/redirect' });
  }, []);

  const logout = useCallback(() => {
    const postLogoutRedirectUri = window.location.origin;

    signOut({
      redirect: true,
      callbackUrl: `https://${NEXT_PUBLIC_TENANT_DOMAIN}/${AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/oauth2/v2.0/logout?post_logout_redirect_uri=${postLogoutRedirectUri}`,
    }).then(function () {
      window.location.href = `https://${NEXT_PUBLIC_TENANT_DOMAIN}/${AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/oauth2/v2.0/logout?post_logout_redirect_uri=${postLogoutRedirectUri}`;
    });
  }, []);

  const session = useMemo<UserSession | null>(() => {
    if (!data) {
      return null;
    }
    return data as UserSession;
  }, [data]);

  const isAdmin = useMemo(() => {
    return userProfile?.userRoles?.some(
      userRole => userRole.role?.name === ROLES.ADMIN,
    );
  }, [userProfile]);

  const isReader = useMemo(() => {
    return userProfile?.userRoles?.some(
      userRole => userRole.role?.name === ROLES.READER,
    );
  }, [userProfile]);

  const isPublisher = useMemo(() => {
    return userProfile?.userRoles?.some(
      userRole => userRole.role?.name === ROLES.PUBLISHER,
    );
  }, [userProfile]);

  const containsRoles = useCallback(
    (roles: string[]) => {
      return userProfile?.userRoles?.some(userRole =>
        roles.includes(userRole.role?.name || ''),
      );
    },
    [userProfile],
  );

  return {
    login,
    logout,
    containsRoles,
    session,
    status,
    isUserSignedIn,
    userProfile,
    isFetchingUserProfile,
    errorFetchingUserProfile,
    isAdmin,
    isReader,
    isPublisher,
  };
};
