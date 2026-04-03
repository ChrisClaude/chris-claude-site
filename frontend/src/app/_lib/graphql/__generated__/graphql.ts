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

/** Defines when a policy shall be executed. */
export enum ApplyPolicy {
  /** After the resolver was executed. */
  AfterResolver = 'AFTER_RESOLVER',
  /** Before the resolver was executed. */
  BeforeResolver = 'BEFORE_RESOLVER',
  /** The policy is applied in the validation step before the execution. */
  Validation = 'VALIDATION'
}

export type BookmarkDto = {
  __typename?: 'BookmarkDto';
  post?: Maybe<PostDto>;
  postId: Scalars['UUID']['output'];
  userId: Scalars['UUID']['output'];
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
  /**
   * Returns a short-lived SAS upload URL so the client can PUT the image
   * directly to blob storage, keeping binary data out of the GraphQL layer.
   */
  requestImageUploadUrl: RequestImageUploadUrlPayload;
  updateUser: UpdateUserPayload;
};


export type MutationRequestImageUploadUrlArgs = {
  input: RequestImageUploadUrlInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type PostDto = {
  __typename?: 'PostDto';
  authorId: Scalars['UUID']['output'];
  createdAt: Scalars['DateTime']['output'];
  excerpt: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  slug: Scalars['String']['output'];
  status: PostStatus;
  thumbnail: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PostReactionDto = {
  __typename?: 'PostReactionDto';
  post: PostDto;
  postId: Scalars['UUID']['output'];
};

export enum PostStatus {
  Archived = 'ARCHIVED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type Query = {
  __typename?: 'Query';
  me: UserDto;
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

export type RoleDto = {
  __typename?: 'RoleDto';
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

export type UserRoleDto = {
  __typename?: 'UserRoleDto';
  role: RoleDto;
};

export type RequestImageUploadUrlMutationVariables = Exact<{
  input: RequestImageUploadUrlInput;
}>;


export type RequestImageUploadUrlMutation = { __typename?: 'Mutation', requestImageUploadUrl: { __typename?: 'RequestImageUploadUrlPayload', imageUploadToken?: { __typename?: 'ImageUploadToken', uploadUrl: any, blobUrl: any } | null, errors?: Array<{ __typename?: 'UserContextError', message: string }> | null } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UpdateUserPayload', userDto?: { __typename?: 'UserDto', id: any, name: string, surname: string, image?: string | null, email: string, userRoles: Array<{ __typename?: 'UserRoleDto', role: { __typename?: 'RoleDto', name: string } }> } | null, errors?: Array<{ __typename?: 'DomainError', message: string, code: string } | { __typename?: 'UserContextError', message: string }> | null } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me: { __typename?: 'UserDto', id: any, email: string, name: string, surname: string, image?: string | null, userRoles: Array<{ __typename?: 'UserRoleDto', role: { __typename?: 'RoleDto', name: string } }> } };


export const RequestImageUploadUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestImageUploadUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestImageUploadUrlInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestImageUploadUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUploadToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadUrl"}},{"kind":"Field","name":{"kind":"Name","value":"blobUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserContextError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RequestImageUploadUrlMutation, RequestImageUploadUrlMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userDto"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"userRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserContextError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DomainError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"userRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;