export const ARTICLES_PER_PAGE = process.env.NEXT_PUBLIC_ARTICLES_PER_PAGE !== undefined? parseInt(process.env.NEXT_PUBLIC_ARTICLES_PER_PAGE) : 6;

export const ROOT_URL: string = process.env.NEXT_PUBLIC_ROOT_URL ?? '';