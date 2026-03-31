import { gql } from '@apollo/client';

export const GET_ME = gql`
  query GetMe {
    me {
      id
      email
      name
      surname
      image
      userRoles {
        role {
          name
        }
      }
    }
  }
`;
