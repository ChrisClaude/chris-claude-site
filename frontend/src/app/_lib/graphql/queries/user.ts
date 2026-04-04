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
  query GetUsers($page: Int!, $pageSize: Int!) {
    getUsers(page: $page, pageSize: $pageSize) {
      pageIndex
      pageSize
      totalCount
      totalPages
      hasNextPage
      hasPreviousPage
      items {
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
