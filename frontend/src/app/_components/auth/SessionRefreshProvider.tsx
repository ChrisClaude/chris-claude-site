'use client';
import React, { useEffect, useCallback } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { isPast, subMinutes } from 'date-fns';

// Refresh proactively this many minutes before the token expires
const PROACTIVE_REFRESH_MINUTES = 5;
// How often to poll for token expiry (catches backgrounded tabs)
const CHECK_INTERVAL_MS = 30 * 1000;

const SessionRefreshProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session, update } = useSession();

  const checkAndRefreshToken = useCallback(async () => {
    if (session == null) {
      return;
    }

    if (
      session.error === 'RefreshAccessTokenError' ||
      session.error === 'RefreshTokenExpired' ||
      session.error === 'RefreshTokenNotSet'
    ) {
      signIn('azure-ad-b2c');
      return;
    }

    if (session.user && !session.accessToken && !session.refreshToken) {
      signOut();
      return;
    }

    const accessTokenExpired =
      (session?.accessToken && !session.accessTokenExpires) ||
      (session?.accessTokenExpires && isPast(session.accessTokenExpires));

    const refreshTokenExpired =
      !session.refreshToken ||
      !session.refreshTokenExpires ||
      isPast(session.refreshTokenExpires);

    if (accessTokenExpired) {
      if (refreshTokenExpired) {
        signOut();
      } else {
        // Trigger the JWT callback server-side to exchange the refresh token
        await update();
      }
      return;
    }

    // Proactively refresh before expiry so requests never race against expiry
    if (
      session?.accessTokenExpires &&
      isPast(
        subMinutes(
          new Date(session.accessTokenExpires),
          PROACTIVE_REFRESH_MINUTES,
        ),
      ) &&
      !refreshTokenExpired
    ) {
      await update();
    }
  }, [session, update]);

  useEffect(() => {
    checkAndRefreshToken();

    const interval = setInterval(checkAndRefreshToken, CHECK_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [checkAndRefreshToken]);

  return <>{children}</>;
};

export default SessionRefreshProvider;
