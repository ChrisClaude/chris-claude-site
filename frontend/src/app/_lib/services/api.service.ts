import { API_BASE_PATH } from '@/_config';
import { UserApi, Configuration } from '../codegen';
import { getSession } from 'next-auth/react';

const getAccessToken = async () => {
  const session = await getSession();

  //@ts-expect-error: we augmented the session object with accessToken in api/auth/[...nextauth]/route.ts
  return session?.accessToken || '';
};

const API_CONFIG = new Configuration({
  basePath: API_BASE_PATH,
  accessToken: getAccessToken,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class UserApiWithConfig extends UserApi {
  constructor() {
    super(API_CONFIG);
  }
}
