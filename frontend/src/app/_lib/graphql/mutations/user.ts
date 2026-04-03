import { gql } from '@apollo/client';

export const REQUEST_IMAGE_UPLOAD_URL = gql`
  mutation RequestImageUploadUrl($input: RequestImageUploadUrlInput!) {
    requestImageUploadUrl(input: $input) {
      imageUploadToken {
        uploadUrl
        blobUrl
      }
      errors {
        ... on UserContextError {
          message
        }
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      userDto {
        id
        name
        surname
        image
        email
        userRoles {
          role {
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
