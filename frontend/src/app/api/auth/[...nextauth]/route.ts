import AzureADB2CProvider from 'next-auth/providers/azure-ad-b2c';
import NextAuth, { Account, Profile, Session, User } from 'next-auth';
import {
  AZURE_AD_B2C_API_SCOPE,
  AZURE_AD_B2C_CLIENT_ID,
  AZURE_AD_B2C_CLIENT_SECRET,
  AZURE_AD_B2C_PRIMARY_USER_FLOW,
  AZURE_AD_B2C_TENANT_NAME,
  NEXT_PUBLIC_TENANT_DOMAIN,
} from '@/_config';
import { JwtPayload, decode } from 'jsonwebtoken';
import { logError } from '@/_lib/logging.utils';
import { cookies } from 'next/headers';
import { JWT } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/adapters';
import { isANumber } from '@/_lib/common.utils';

const handler = NextAuth({
  providers: [
    AzureADB2CProvider({
      tenantId: AZURE_AD_B2C_TENANT_NAME,
      clientId: AZURE_AD_B2C_CLIENT_ID,
      clientSecret: AZURE_AD_B2C_CLIENT_SECRET,
      primaryUserFlow: AZURE_AD_B2C_PRIMARY_USER_FLOW,
      issuer: `https://${NEXT_PUBLIC_TENANT_DOMAIN}/${AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${AZURE_AD_B2C_PRIMARY_USER_FLOW}/v2.0`,
      authorization: {
        url: `https://${NEXT_PUBLIC_TENANT_DOMAIN}/${AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/oauth2/v2.0/authorize?p=${AZURE_AD_B2C_PRIMARY_USER_FLOW}`,
        params: {
          scope: `offline_access openid https://${AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${AZURE_AD_B2C_API_SCOPE}`,
          p: AZURE_AD_B2C_PRIMARY_USER_FLOW,
        },
      },
      checks: ['pkce'],
    }),
  ],

  pages: {
    signIn: '/auth/azure-ad-b2c-redirect', // Redirect to the custom sign-in handler
  },
  callbacks: {
    async jwt({
      token,
      account,
    }: {
      token: JWT;
      user: User | AdapterUser;
      account: Account | null;
      profile?: Profile | undefined;
      trigger?: 'signIn' | 'signUp' | 'update';
      isNewUser?: boolean;
      session?: string;
    }) {
      const decoded = decode(token.accessToken as string) as JwtPayload | null;
      token.externalProvider = decoded?.idp;

      // Persist the OAuth access_token to the token right after signin
      if (account !== undefined && account !== null) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = isANumber(account.expires_on)
          ? account.expires_on * 1000
          : isANumber(account.expires_in)
            ? Date.now() + account.expires_in * 1000
            : undefined;
        token.refreshTokenExpires = isANumber(account.refresh_token_expires_in)
          ? Date.now() + account.refresh_token_expires_in * 1000
          : undefined;
      }

      if (
        token.accessToken &&
        isANumber(token.accessTokenExpires) &&
        Date.now() < token.accessTokenExpires
      ) {
        return token;
      }

      if (
        token.refreshToken &&
        isANumber(token.refreshTokenExpires) &&
        Date.now() < token.refreshTokenExpires
      ) {
        return refreshAccessToken(token);
      } else {
        return {
          ...token,
          error: 'RefreshTokenExpired',
        };
      }
    },
    async session({
      session,
      token,
    }: {
      session: Session & {
        error?: string;
        accessToken?: string;
        refreshToken?: string;
        accessTokenExpires?: number;
        refreshTokenExpires?: number;
        externalProvider?: string;
      };
      token: JWT;
      user: AdapterUser;
    } & {
      newSession: string;
      trigger: 'update';
    }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken as string;
      session.externalProvider = token.externalProvider as string;
      session.accessTokenExpires = token.accessTokenExpires as number;
      session.refreshToken = token.refreshToken as string;
      session.refreshTokenExpires = token.refreshTokenExpires as number;
      session.error = token.error as string;
      const cookieStore = await cookies();
      cookieStore.set({
        name: 'user-token',
        value: session.accessToken as string,
        expires: token.accessTokenExpires as number,
        httpOnly: true,
      });
      cookieStore.set({
        name: 'user-refresh',
        value: session.refreshToken as string,
        expires: token.refreshTokenExpires as number,
        httpOnly: true,
      });
      return session;
    },
  },
  events: {
    signOut: async () => {
      const cookieStore = await cookies();
      cookieStore.delete('user-token');
      cookieStore.delete('user-refresh');
    },
  },
});

async function refreshAccessToken(token: JWT) {
  try {
    const params = new URLSearchParams();
    params.append('client_id', process.env.AUTH_AZURE_AD_B2C_ID as string);
    params.append('refresh_token', token.refreshToken as string);
    params.append('grant_type', 'refresh_token');
    params.append(
      'scope',
      `openid offline_access https://${AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${AZURE_AD_B2C_API_SCOPE}`,
    );

    const response = await fetch(
      `https://${NEXT_PUBLIC_TENANT_DOMAIN}/${AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${AZURE_AD_B2C_PRIMARY_USER_FLOW}/oauth2/v2.0/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      },
    );

    const refreshedTokens = await response.json();

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to the old refresh token if none is returned
      refreshTokenExpiresIn: refreshedTokens.refresh_token_expires_in
        ? Date.now() + refreshedTokens.refresh_token_expires_in * 1000
        : token.refreshTokenExpiresIn,
    };
  } catch (error) {
    logError(
      error?.toString() || 'Error refreshing access token',
      'RefreshAccessTokenError',
      error,
    );

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export { handler as GET, handler as POST };
