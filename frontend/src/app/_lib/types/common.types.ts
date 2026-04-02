import { Session } from 'next-auth';

export type Result<T> = {
  success: boolean;
  message?: string | unknown;
  errors?: string[];
  data?: T;
};

export type ApiError = {
  description: string;
  code: string;
};

export type UserSession = Session & {
  accessToken: string;
  externalProvider?: string;
};

export type ValidationError = string | string[];
export type ValidationErrors = Record<string, ValidationError>;
export type UserType = 'Admin' | 'Reader';
