import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  Observable,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { getSession, signIn, signOut } from 'next-auth/react';
import { API_BASE_PATH } from '@/_config';

const httpLink = createHttpLink({
  uri: `${API_BASE_PATH}/graphql`,
});

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const accessToken = (session as any)?.accessToken;
  return {
    headers: {
      ...headers,
      ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {}),
    },
  };
});

// Handles 401 responses: forces a session refresh and retries once,
// or redirects to sign-in if the session cannot be recovered.
const errorLink = onError(({ networkError, operation, forward }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (networkError && (networkError as any).statusCode === 401) {
    return new Observable(observer => {
      getSession()
        .then(session => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const s = session as any;
          if (!session || s?.error) {
            signIn('azure-ad-b2c');
            observer.complete();
            return;
          }

          // Re-attach the refreshed token and retry
          operation.setContext(({ headers = {} }: { headers: Record<string, string> }) => ({
            headers: {
              ...headers,
              authorization: `Bearer ${s.accessToken}`,
            },
          }));

          forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(() => {
          signOut();
          observer.complete();
        });
    });
  }
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
