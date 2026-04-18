import { gql } from '@apollo/client';

export const UPDATE_POST = gql`
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(input: $input) {
      postDto {
        id
        title
        slug
        excerpt
        thumbnail
        status
        createdAt
        updatedAt
        postTags {
          tag {
            id
            name
          }
        }
      }
      errors {
        ... on UserContextError {
          message
        }
        ... on DomainError {
          message
          code
        }
      }
    }
  }
`;

export const ADMIN_UPDATE_POST_STATUS = gql`
  mutation AdminUpdatePostStatus($input: AdminUpdatePostStatusInput!) {
    adminUpdatePostStatus(input: $input) {
      postDto {
        id
        title
        slug
        status
        updatedAt
        author {
          id
          name
          surname
        }
      }
      errors {
        ... on UserContextError {
          message
        }
        ... on DomainError {
          message
          code
        }
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      postDto {
        id
        title
        slug
        excerpt
        thumbnail
        status
        createdAt
        author {
          id
          name
          surname
          image
        }
        postTags {
          tag {
            id
            name
          }
        }
      }
      errors {
        ... on UserContextError {
          message
        }
        ... on DomainError {
          message
          code
        }
      }
    }
  }
`;
