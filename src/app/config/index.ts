export const ARTICLES_PER_PAGE = process.env.NEXT_PUBLIC_ARTICLES_PER_PAGE !== undefined? parseInt(process.env.NEXT_PUBLIC_ARTICLES_PER_PAGE) : 6;

export const ROOT_URL: string = process.env.NEXT_PUBLIC_ROOT_URL ?? '';

export const APP_ENV = process.env.APP_ENV ?? 'development';

export const S3_Bucket = process.env.S3_BUCKET;

export const S3_MAX_KEYS = process.env.S3_MAX_KEYS;

export const S3_REGION = process.env.S3_REGION;

export const S3_HOME_MAX_KEYS = process.env.NEXT_PUBLIC_S3_HOME_MAX_KEYS;