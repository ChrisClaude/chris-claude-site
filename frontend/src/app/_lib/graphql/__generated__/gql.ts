/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation RequestImageUploadUrl($input: RequestImageUploadUrlInput!) {\n    requestImageUploadUrl(input: $input) {\n      imageUploadToken {\n        uploadUrl\n        blobUrl\n      }\n      errors {\n        ... on UserContextError {\n          message\n        }\n      }\n    }\n  }\n": typeof types.RequestImageUploadUrlDocument,
    "\n  mutation AdminUpdateUser($input: AdminUpdateUserInput!) {\n    adminUpdateUser(input: $input) {\n      userDto {\n        id\n        name\n        surname\n        image\n        email\n        userRoles {\n          role {\n            name\n          }\n        }\n      }\n      errors {\n        ... on DomainError {\n          message\n          code\n        }\n      }\n    }\n  }\n": typeof types.AdminUpdateUserDocument,
    "\n  mutation AdminUpdateUserRoles($input: AdminUpdateUserRolesInput!) {\n    adminUpdateUserRoles(input: $input) {\n      userDto {\n        id\n        email\n        name\n        surname\n        userRoles {\n          role {\n            name\n          }\n        }\n      }\n      errors {\n        ... on DomainError {\n          message\n          code\n        }\n      }\n    }\n  }\n": typeof types.AdminUpdateUserRolesDocument,
    "\n  mutation UpdateUser($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n      userDto {\n        id\n        name\n        surname\n        image\n        email\n        userRoles {\n          role {\n            name\n          }\n        }\n      }\n      errors {\n        ... on UserContextError {\n          message\n        }\n        ... on DomainError {\n          message\n          code\n        }\n      }\n    }\n  }\n": typeof types.UpdateUserDocument,
    "\n  query GetMe {\n    me {\n      id\n      email\n      name\n      surname\n      image\n      userRoles {\n        role {\n          name\n        }\n      }\n    }\n  }\n": typeof types.GetMeDocument,
    "\n  query GetUsers($first: Int, $after: String) {\n    users(first: $first, after: $after) {\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      nodes {\n        id\n        email\n        name\n        surname\n        image\n        userRoles {\n          role {\n            name\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetUsersDocument,
};
const documents: Documents = {
    "\n  mutation RequestImageUploadUrl($input: RequestImageUploadUrlInput!) {\n    requestImageUploadUrl(input: $input) {\n      imageUploadToken {\n        uploadUrl\n        blobUrl\n      }\n      errors {\n        ... on UserContextError {\n          message\n        }\n      }\n    }\n  }\n": types.RequestImageUploadUrlDocument,
    "\n  mutation AdminUpdateUser($input: AdminUpdateUserInput!) {\n    adminUpdateUser(input: $input) {\n      userDto {\n        id\n        name\n        surname\n        image\n        email\n        userRoles {\n          role {\n            name\n          }\n        }\n      }\n      errors {\n        ... on DomainError {\n          message\n          code\n        }\n      }\n    }\n  }\n": types.AdminUpdateUserDocument,
    "\n  mutation AdminUpdateUserRoles($input: AdminUpdateUserRolesInput!) {\n    adminUpdateUserRoles(input: $input) {\n      userDto {\n        id\n        email\n        name\n        surname\n        userRoles {\n          role {\n            name\n          }\n        }\n      }\n      errors {\n        ... on DomainError {\n          message\n          code\n        }\n      }\n    }\n  }\n": types.AdminUpdateUserRolesDocument,
    "\n  mutation UpdateUser($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n      userDto {\n        id\n        name\n        surname\n        image\n        email\n        userRoles {\n          role {\n            name\n          }\n        }\n      }\n      errors {\n        ... on UserContextError {\n          message\n        }\n        ... on DomainError {\n          message\n          code\n        }\n      }\n    }\n  }\n": types.UpdateUserDocument,
    "\n  query GetMe {\n    me {\n      id\n      email\n      name\n      surname\n      image\n      userRoles {\n        role {\n          name\n        }\n      }\n    }\n  }\n": types.GetMeDocument,
    "\n  query GetUsers($first: Int, $after: String) {\n    users(first: $first, after: $after) {\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      nodes {\n        id\n        email\n        name\n        surname\n        image\n        userRoles {\n          role {\n            name\n          }\n        }\n      }\n    }\n  }\n": types.GetUsersDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RequestImageUploadUrl($input: RequestImageUploadUrlInput!) {\n    requestImageUploadUrl(input: $input) {\n      imageUploadToken {\n        uploadUrl\n        blobUrl\n      }\n      errors {\n        ... on UserContextError {\n          message\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RequestImageUploadUrl($input: RequestImageUploadUrlInput!) {\n    requestImageUploadUrl(input: $input) {\n      imageUploadToken {\n        uploadUrl\n        blobUrl\n      }\n      errors {\n        ... on UserContextError {\n          message\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AdminUpdateUser($input: AdminUpdateUserInput!) {\n    adminUpdateUser(input: $input) {\n      userDto {\n        id\n        name\n        surname\n        image\n        email\n        userRoles {\n          role {\n            name\n          }\n        }\n      }\n      errors {\n        ... on DomainError {\n          message\n          code\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AdminUpdateUser($input: AdminUpdateUserInput!) {\n    adminUpdateUser(input: $input) {\n      userDto {\n        id\n        name\n        surname\n        image\n        email\n        userRoles {\n          role {\n            name\n          }\n        }\n      }\n      errors {\n        ... on DomainError {\n          message\n          code\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AdminUpdateUserRoles($input: AdminUpdateUserRolesInput!) {\n    adminUpdateUserRoles(input: $input) {\n      userDto {\n        id\n        email\n        name\n        surname\n        userRoles {\n          role {\n            name\n          }\n        }\n      }\n      errors {\n        ... on DomainError {\n          message\n          code\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AdminUpdateUserRoles($input: AdminUpdateUserRolesInput!) {\n    adminUpdateUserRoles(input: $input) {\n      userDto {\n        id\n        email\n        name\n        surname\n        userRoles {\n          role {\n            name\n          }\n        }\n      }\n      errors {\n        ... on DomainError {\n          message\n          code\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUser($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n      userDto {\n        id\n        name\n        surname\n        image\n        email\n        userRoles {\n          role {\n            name\n          }\n        }\n      }\n      errors {\n        ... on UserContextError {\n          message\n        }\n        ... on DomainError {\n          message\n          code\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n      userDto {\n        id\n        name\n        surname\n        image\n        email\n        userRoles {\n          role {\n            name\n          }\n        }\n      }\n      errors {\n        ... on UserContextError {\n          message\n        }\n        ... on DomainError {\n          message\n          code\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMe {\n    me {\n      id\n      email\n      name\n      surname\n      image\n      userRoles {\n        role {\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMe {\n    me {\n      id\n      email\n      name\n      surname\n      image\n      userRoles {\n        role {\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUsers($first: Int, $after: String) {\n    users(first: $first, after: $after) {\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      nodes {\n        id\n        email\n        name\n        surname\n        image\n        userRoles {\n          role {\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUsers($first: Int, $after: String) {\n    users(first: $first, after: $after) {\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      nodes {\n        id\n        email\n        name\n        surname\n        image\n        userRoles {\n          role {\n            name\n          }\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;