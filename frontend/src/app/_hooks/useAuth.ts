import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import {
  NEXT_PUBLIC_TENANT_DOMAIN,
  AZURE_AD_B2C_TENANT_NAME,
  AZURE_AD_B2C_PRIMARY_USER_FLOW,
} from '@/_config';
import { signIn, signOut } from 'next-auth/react';
import { useCallback } from 'react';
import { UserSession } from '@/_lib/types/common.types';
import { useGetUserProfileQuery } from '@/_lib/queries';
import { UserDto } from '@/_lib/codegen';
import { QueryResult } from '@/_lib/queries/rtk.types';
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
    data: userProfile,
    isFetching: isFetchingUserProfile,
    error: errorFetchingUserProfile,
  } = useGetUserProfileQuery<QueryResult<UserDto>>({
    keepUnusedDataFor: 10 * 60, // 10 minutes
  });

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
      callbackUrl: `https://${NEXT_PUBLIC_TENANT_DOMAIN}/${AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${AZURE_AD_B2C_PRIMARY_USER_FLOW}/oauth2/v2.0/logout?post_logout_redirect_uri=${postLogoutRedirectUri}`,
    }).then(function () {
      window.location.href = `https://${NEXT_PUBLIC_TENANT_DOMAIN}/${AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${AZURE_AD_B2C_PRIMARY_USER_FLOW}/oauth2/v2.0/logout?post_logout_redirect_uri=${postLogoutRedirectUri}`;
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

  /**
   * This method checks if the logged in user has any of the roles provided in the array.
   * @param roles array of roles to check
   * @returns true if the logged in user has any of the roles, false otherwise
   */
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
    isCustomer: isReader,
  };
};
