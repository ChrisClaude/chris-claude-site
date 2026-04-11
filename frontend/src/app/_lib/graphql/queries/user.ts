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

export const GET_USERS = gql`
  query GetUsers($first: Int, $after: String) {
    users(first: $first, after: $after) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
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
  }
`;
