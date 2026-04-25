import { gql } from '@apollo/client';

export const ADD_BOOKMARK = gql`
  mutation AddBookmark($input: AddBookmarkInput!) {
    addBookmark(input: $input) {
      bookmarkDto {
        postId
        userId
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

export const REMOVE_BOOKMARK = gql`
  mutation RemoveBookmark($input: RemoveBookmarkInput!) {
    removeBookmark(input: $input) {
      bookmarkDto {
        postId
        userId
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
