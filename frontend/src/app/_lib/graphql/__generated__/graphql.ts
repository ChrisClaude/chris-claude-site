/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
  URL: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type AdminUpdateUserError = DomainError;

export type AdminUpdateUserInput = {
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  surname: Scalars['String']['input'];
  userId: Scalars['UUID']['input'];
};

export type AdminUpdateUserPayload = {
  __typename?: 'AdminUpdateUserPayload';
  errors?: Maybe<Array<AdminUpdateUserError>>;
  userDto?: Maybe<UserDto>;
};

export type AdminUpdateUserRolesError = DomainError;

export type AdminUpdateUserRolesInput = {
  roles: Array<Scalars['String']['input']>;
  userId: Scalars['UUID']['input'];
};

export type AdminUpdateUserRolesPayload = {
  __typename?: 'AdminUpdateUserRolesPayload';
  errors?: Maybe<Array<AdminUpdateUserRolesError>>;
  userDto?: Maybe<UserDto>;
};

/** Defines when a policy shall be executed. */
export enum ApplyPolicy {
  /** After the resolver was executed. */
  AfterResolver = 'AFTER_RESOLVER',
  /** Before the resolver was executed. */
  BeforeResolver = 'BEFORE_RESOLVER',
  /** The policy is applied in the validation step before the execution. */
  Validation = 'VALIDATION'
}

export enum AuditActionType {
  Create = 'CREATE',
  Delete = 'DELETE',
  Update = 'UPDATE'
}

export type Bookmark = {
  __typename?: 'Bookmark';
  post: Post;
  postId: Scalars['UUID']['output'];
  user: User;
  userId: Scalars['UUID']['output'];
};

export type BookmarkDto = {
  __typename?: 'BookmarkDto';
  post?: Maybe<PostDto>;
  postId: Scalars['UUID']['output'];
  userId: Scalars['UUID']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  auditAction: AuditActionType;
  author: User;
  authorId: Scalars['UUID']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['UUID']['output'];
  createdByUser: User;
  id: Scalars['UUID']['output'];
  isDeleted: Scalars['Boolean']['output'];
  newState: Scalars['String']['output'];
  post: Post;
  postId: Scalars['UUID']['output'];
  previousState: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedBy?: Maybe<Scalars['UUID']['output']>;
  updatedByUser: User;
};

export type CommentDto = {
  __typename?: 'CommentDto';
  authorId: Scalars['UUID']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  postId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DomainError = Error & {
  __typename?: 'DomainError';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type Error = {
  message: Scalars['String']['output'];
};

export type ImageUploadToken = {
  __typename?: 'ImageUploadToken';
  blobUrl: Scalars['URL']['output'];
  uploadUrl: Scalars['URL']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  adminUpdateUser: AdminUpdateUserPayload;
  adminUpdateUserRoles: AdminUpdateUserRolesPayload;
  /**
   * Returns a short-lived SAS upload URL so the client can PUT the image
   * directly to blob storage, keeping binary data out of the GraphQL layer.
   */
  requestImageUploadUrl: RequestImageUploadUrlPayload;
  updateUser: UpdateUserPayload;
};


export type MutationAdminUpdateUserArgs = {
  input: AdminUpdateUserInput;
};


export type MutationAdminUpdateUserRolesArgs = {
  input: AdminUpdateUserRolesInput;
};


export type MutationRequestImageUploadUrlArgs = {
  input: RequestImageUploadUrlInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type NewsletterSignUp = {
  __typename?: 'NewsletterSignUp';
  auditAction: AuditActionType;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['UUID']['output'];
  createdByUser: User;
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  newState: Scalars['String']['output'];
  previousState: Scalars['String']['output'];
  processedNotifications: Array<ProcessedNotification>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedBy?: Maybe<Scalars['UUID']['output']>;
  updatedByUser: User;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Post = {
  __typename?: 'Post';
  auditAction: AuditActionType;
  author?: Maybe<User>;
  authorId: Scalars['UUID']['output'];
  bookmarks: Array<Bookmark>;
  comments: Array<Comment>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['UUID']['output'];
  createdByUser: User;
  excerpt: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  isDeleted: Scalars['Boolean']['output'];
  newState: Scalars['String']['output'];
  postReactions: Array<PostReaction>;
  postTags: Array<PostTag>;
  previousState: Scalars['String']['output'];
  processedNotifications: Array<ProcessedNotification>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  slug: Scalars['String']['output'];
  status: PostStatus;
  thumbnail: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedBy?: Maybe<Scalars['UUID']['output']>;
  updatedByUser: User;
};

export type PostDto = {
  __typename?: 'PostDto';
  author: UserDto;
  authorId: Scalars['UUID']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  excerpt: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  postTags: Array<PostTagDto>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  slug: Scalars['String']['output'];
  status: PostStatus;
  thumbnail: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PostFilterInput = {
  and?: InputMaybe<Array<PostFilterInput>>;
  authorId?: InputMaybe<UuidOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<PostFilterInput>>;
  publishedAt?: InputMaybe<DateTimeOperationFilterInput>;
  slug?: InputMaybe<StringOperationFilterInput>;
  status?: InputMaybe<PostStatusOperationFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
};

export type PostReaction = {
  __typename?: 'PostReaction';
  post: Post;
  postId: Scalars['UUID']['output'];
  user: User;
  userId: Scalars['UUID']['output'];
};

export type PostReactionDto = {
  __typename?: 'PostReactionDto';
  post: PostDto;
  postId: Scalars['UUID']['output'];
};

export type PostSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  publishedAt?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
};

export enum PostStatus {
  Archived = 'ARCHIVED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type PostStatusOperationFilterInput = {
  eq?: InputMaybe<PostStatus>;
  in?: InputMaybe<Array<PostStatus>>;
  neq?: InputMaybe<PostStatus>;
  nin?: InputMaybe<Array<PostStatus>>;
};

export type PostTag = {
  __typename?: 'PostTag';
  post: Post;
  postId: Scalars['UUID']['output'];
  tag: Tag;
  tagId: Scalars['UUID']['output'];
};

export type PostTagDto = {
  __typename?: 'PostTagDto';
  postId: Scalars['UUID']['output'];
  tag: TagDto;
  tagId: Scalars['UUID']['output'];
};

/** A connection to a list of items. */
export type PostsConnection = {
  __typename?: 'PostsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<PostsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Post>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type PostsEdge = {
  __typename?: 'PostsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Post;
};

export type ProcessedNotification = {
  __typename?: 'ProcessedNotification';
  isSent: Scalars['Boolean']['output'];
  newsletterSignUp: NewsletterSignUp;
  newsletterSignUpId: Scalars['UUID']['output'];
  post: Post;
  postId: Scalars['UUID']['output'];
  processedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  posts?: Maybe<PostsConnection>;
  users?: Maybe<UsersConnection>;
};


export type QueryPostsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<PostSortInput>>;
  where?: InputMaybe<PostFilterInput>;
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<UserSortInput>>;
  where?: InputMaybe<UserFilterInput>;
};

export type RequestImageUploadUrlError = UserContextError;

export type RequestImageUploadUrlInput = {
  contentType: Scalars['String']['input'];
  fileName: Scalars['String']['input'];
};

export type RequestImageUploadUrlPayload = {
  __typename?: 'RequestImageUploadUrlPayload';
  errors?: Maybe<Array<RequestImageUploadUrlError>>;
  imageUploadToken?: Maybe<ImageUploadToken>;
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  userRoles?: Maybe<Array<UserRole>>;
};

export type RoleDto = {
  __typename?: 'RoleDto';
  name: Scalars['String']['output'];
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Tag = {
  __typename?: 'Tag';
  auditAction: AuditActionType;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['UUID']['output'];
  createdByUser: User;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  newState: Scalars['String']['output'];
  postTags: Array<PostTag>;
  previousState: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedBy?: Maybe<Scalars['UUID']['output']>;
  updatedByUser: User;
};

export type TagDto = {
  __typename?: 'TagDto';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type UpdateUserError = DomainError | UserContextError;

export type UpdateUserInput = {
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  surname: Scalars['String']['input'];
};

export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  errors?: Maybe<Array<UpdateUserError>>;
  userDto?: Maybe<UserDto>;
};

export type User = {
  __typename?: 'User';
  bookmarks?: Maybe<Array<Bookmark>>;
  comments?: Maybe<Array<Comment>>;
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  postReactions?: Maybe<Array<PostReaction>>;
  posts?: Maybe<Array<Post>>;
  surname: Scalars['String']['output'];
  userRoles: Array<UserRole>;
};

export type UserContextError = Error & {
  __typename?: 'UserContextError';
  message: Scalars['String']['output'];
};

export type UserDto = {
  __typename?: 'UserDto';
  bookmarks?: Maybe<Array<BookmarkDto>>;
  comments?: Maybe<Array<CommentDto>>;
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  postReactions?: Maybe<Array<PostReactionDto>>;
  posts?: Maybe<Array<PostDto>>;
  surname: Scalars['String']['output'];
  userRoles: Array<UserRoleDto>;
};

export type UserFilterInput = {
  and?: InputMaybe<Array<UserFilterInput>>;
  email?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<UserFilterInput>>;
  surname?: InputMaybe<StringOperationFilterInput>;
};

export type UserRole = {
  __typename?: 'UserRole';
  role: Role;
  roleId: Scalars['UUID']['output'];
  user?: Maybe<User>;
  userId: Scalars['UUID']['output'];
};

export type UserRoleDto = {
  __typename?: 'UserRoleDto';
  role: RoleDto;
};

export type UserSortInput = {
  email?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  surname?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type UsersConnection = {
  __typename?: 'UsersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<UsersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<User>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type UsersEdge = {
  __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: User;
};

export type UuidOperationFilterInput = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  gt?: InputMaybe<Scalars['UUID']['input']>;
  gte?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  lt?: InputMaybe<Scalars['UUID']['input']>;
  lte?: InputMaybe<Scalars['UUID']['input']>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
  ngt?: InputMaybe<Scalars['UUID']['input']>;
  ngte?: InputMaybe<Scalars['UUID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  nlt?: InputMaybe<Scalars['UUID']['input']>;
  nlte?: InputMaybe<Scalars['UUID']['input']>;
};

export type RequestImageUploadUrlMutationVariables = Exact<{
  input: RequestImageUploadUrlInput;
}>;


export type RequestImageUploadUrlMutation = { __typename?: 'Mutation', requestImageUploadUrl: { __typename?: 'RequestImageUploadUrlPayload', imageUploadToken?: { __typename?: 'ImageUploadToken', uploadUrl: any, blobUrl: any } | null, errors?: Array<{ __typename?: 'UserContextError', message: string }> | null } };

export type AdminUpdateUserMutationVariables = Exact<{
  input: AdminUpdateUserInput;
}>;


export type AdminUpdateUserMutation = { __typename?: 'Mutation', adminUpdateUser: { __typename?: 'AdminUpdateUserPayload', userDto?: { __typename?: 'UserDto', id: any, name: string, surname: string, image?: string | null, email: string, userRoles: Array<{ __typename?: 'UserRoleDto', role: { __typename?: 'RoleDto', name: string } }> } | null, errors?: Array<{ __typename?: 'DomainError', message: string, code: string }> | null } };

export type AdminUpdateUserRolesMutationVariables = Exact<{
  input: AdminUpdateUserRolesInput;
}>;


export type AdminUpdateUserRolesMutation = { __typename?: 'Mutation', adminUpdateUserRoles: { __typename?: 'AdminUpdateUserRolesPayload', userDto?: { __typename?: 'UserDto', id: any, email: string, name: string, surname: string, userRoles: Array<{ __typename?: 'UserRoleDto', role: { __typename?: 'RoleDto', name: string } }> } | null, errors?: Array<{ __typename?: 'DomainError', message: string, code: string }> | null } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UpdateUserPayload', userDto?: { __typename?: 'UserDto', id: any, name: string, surname: string, image?: string | null, email: string, userRoles: Array<{ __typename?: 'UserRoleDto', role: { __typename?: 'RoleDto', name: string } }> } | null, errors?: Array<{ __typename?: 'DomainError', message: string, code: string } | { __typename?: 'UserContextError', message: string }> | null } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: any, email: string, name: string, surname: string, image?: string | null, userRoles: Array<{ __typename?: 'UserRole', role: { __typename?: 'Role', name: string } }> } | null };

export type GetUsersQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetUsersQuery = { __typename?: 'Query', users?: { __typename?: 'UsersConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, nodes?: Array<{ __typename?: 'User', id: any, email: string, name: string, surname: string, image?: string | null, userRoles: Array<{ __typename?: 'UserRole', role: { __typename?: 'Role', name: string } }> }> | null } | null };


export const RequestImageUploadUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestImageUploadUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestImageUploadUrlInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestImageUploadUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUploadToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadUrl"}},{"kind":"Field","name":{"kind":"Name","value":"blobUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserContextError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RequestImageUploadUrlMutation, RequestImageUploadUrlMutationVariables>;
export const AdminUpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminUpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminUpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminUpdateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userDto"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"userRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DomainError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AdminUpdateUserMutation, AdminUpdateUserMutationVariables>;
export const AdminUpdateUserRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminUpdateUserRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminUpdateUserRolesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminUpdateUserRoles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userDto"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"userRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DomainError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AdminUpdateUserRolesMutation, AdminUpdateUserRolesMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userDto"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"userRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserContextError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DomainError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"userRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"userRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;