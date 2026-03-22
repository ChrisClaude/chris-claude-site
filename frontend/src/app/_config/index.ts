import { getConfig } from '@/_lib//common.utils';
import { initializeAppInsights } from '@/appInsights';

export const ARTICLES_PER_PAGE =
  process.env.NEXT_PUBLIC_ARTICLES_PER_PAGE !== undefined
    ? parseInt(process.env.NEXT_PUBLIC_ARTICLES_PER_PAGE)
    : 6;

export const ROOT_URL: string = process.env.NEXT_PUBLIC_ROOT_URL ?? '';

export const APP_ENV = process.env.APP_ENV ?? 'development';

export const S3_Bucket = process.env.S3_BUCKET;

export const S3_MAX_KEYS = process.env.S3_MAX_KEYS;

export const S3_REGION = process.env.S3_REGION;

export const S3_HOME_MAX_KEYS = process.env.NEXT_PUBLIC_S3_HOME_MAX_KEYS;

export const PHONE_NUMBER =
  process.env.NEXT_PUBLIC_PHONE_NUMBER ?? '+1 111 111 111 11';

export const EMAIL_ADDRESS =
  process.env.NEXT_PUBLIC_EMAIL_ADDRESS ?? 'christ.tchambila@gmail.com';

export const AZURE_AD_B2C_TENANT_NAME: string = getConfig(
  'AZURE_AD_B2C_TENANT_NAME',
  process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME,
);

export const AZURE_AD_B2C_CLIENT_ID: string = getConfig(
  'AZURE_AD_B2C_CLIENT_ID',
  process.env.NEXT_PUBLIC_AZURE_AD_B2C_CLIENT_ID,
);

export const AZURE_AD_B2C_CLIENT_SECRET = getConfig(
  'AZURE_AD_B2C_CLIENT_SECRET',
  process.env.NEXT_PUBLIC_AZURE_AD_B2C_CLIENT_SECRET,
);

export const AZURE_AD_B2C_PRIMARY_USER_FLOW: string = getConfig(
  'AZURE_AD_B2C_PRIMARY_USER_FLOW',
  process.env.NEXT_PUBLIC_AZURE_AD_B2C_PRIMARY_USER_FLOW,
);

export const AZURE_AD_B2C_API_SCOPE: string = getConfig(
  'AZURE_AD_B2C_API_SCOPE',
  process.env.NEXT_PUBLIC_AZURE_AD_B2C_API_SCOPE,
);

export const NEXT_PUBLIC_TENANT_DOMAIN: string = getConfig(
  'NEXT_PUBLIC_TENANT_DOMAIN',
  process.env.NEXT_PUBLIC_TENANT_DOMAIN,
);

export const COOKIE_BOT_DOMAIN_GROUP_ID: string = getConfig(
  'COOKIE_BOT_DOMAIN_GROUP_ID',
  process.env.COOKIE_BOT_DOMAIN_GROUP_ID,
);

export const BOOKING_FEATURE_ENABLED: boolean =
  getConfig(
    'NEXT_PUBLIC_BOOKING_FEATURE_ENABLED',
    process.env.NEXT_PUBLIC_BOOKING_FEATURE_ENABLED,
  ) === 'true';

export const API_BASE_PATH: string = getConfig(
  'NEXT_PUBLIC_API_BASE_PATH',
  process.env.NEXT_PUBLIC_API_BASE_PATH,
);

export const SLOTS_PER_PAGE_SIZE: number = Number(
  getConfig(
    'NEXT_PUBLIC_SLOTS_PER_PAGE_SIZE',
    process.env.NEXT_PUBLIC_SLOTS_PER_PAGE_SIZE,
  ),
);

export const APP_INSIGHTS_CONNECTION_STRING: string = getConfig(
  'NEXT_PUBLIC_APPLICATION_INSIGHTS_CONNECTION_STRING',
  process.env.NEXT_PUBLIC_APPLICATION_INSIGHTS_CONNECTION_STRING,
);

// Initialize AppInsights with the connection string
initializeAppInsights(APP_INSIGHTS_CONNECTION_STRING);
