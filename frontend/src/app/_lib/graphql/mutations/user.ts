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

export const ADMIN_UPDATE_USER = gql`
  mutation AdminUpdateUser($input: AdminUpdateUserInput!) {
    adminUpdateUser(input: $input) {
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
        ... on DomainError {
          message
          code
        }
      }
    }
  }
`;

export const ADMIN_UPDATE_USER_ROLES = gql`
  mutation AdminUpdateUserRoles($input: AdminUpdateUserRolesInput!) {
    adminUpdateUserRoles(input: $input) {
      userDto {
        id
        email
        name
        surname
        userRoles {
          role {
            name
          }
        }
      }
      errors {
        ... on DomainError {
          message
          code
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
