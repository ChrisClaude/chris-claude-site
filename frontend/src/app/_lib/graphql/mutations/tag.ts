import { gql } from '@apollo/client';

export const CREATE_TAG = gql`
  mutation CreateTag($input: CreateTagInput!) {
    createTag(input: $input) {
      tagDto {
        id
        name
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
