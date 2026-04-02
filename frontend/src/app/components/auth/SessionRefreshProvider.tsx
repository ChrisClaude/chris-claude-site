'use client';
import React, { useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { isPast } from 'date-fns';

const SessionRefreshProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    const refreshToken = () => {
      if (session == null) {
        return;
      }

      if (
        session.error === 'RefreshAccessTokenError' ||
        session.error === 'RefreshTokenExpired' ||
        session.error === 'RefreshTokenNotSet'
      ) {
        signIn('azure-ad-b2c'); // Force sign in to hopefully resolve error
        return;
      }

      if (
        session &&
        session.user &&
        !session.accessToken &&
        !session.refreshToken
      ) {
        signOut();
        return;
      }

      if (
        (session?.accessToken && !session.accessTokenExpires) ||
        (session?.accessTokenExpires && isPast(session.accessTokenExpires))
      ) {
        if (
          !session.refreshToken ||
          !session.refreshTokenExpires ||
          (session.refreshTokenExpires && isPast(session.refreshTokenExpires))
        ) {
          signOut();
        }
      }
    };

    refreshToken();
  }, [session, status]);

  return <>{children}</>;
};

export default SessionRefreshProvider;
