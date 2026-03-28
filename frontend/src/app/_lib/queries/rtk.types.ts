export type CustomBaseQueryType = {
  endpoint: 'user.getUserProfile';
  params?: null;
};

export type QueryResult<T> = {
  data?: T;
  isFetching: boolean;
  error?: string[];
};
