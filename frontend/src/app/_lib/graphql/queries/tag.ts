import { gql } from '@apollo/client';

export const SEARCH_TAGS = gql`
  query SearchTags($first: Int, $search: String) {
    tags(
      first: $first
      where: { name: { contains: $search } }
      order: { name: ASC }
    ) {
      nodes {
        id
        name
      }
    }
  }
`;

export const GET_ALL_TAGS = gql`
  query GetAllTags($first: Int, $after: String) {
    tags(first: $first, after: $after, order: { name: ASC }) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        name
        createdAt
      }
    }
  }
`;
