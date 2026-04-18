import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($first: Int, $after: String) {
    posts(first: $first, after: $after, order: { publishedAt: DESC }) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        id
        title
        slug
        excerpt
        thumbnail
        status
        publishedAt
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
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    posts(first: 1, where: { slug: { eq: $slug } }) {
      nodes {
        id
        title
        slug
        excerpt
        thumbnail
        content
        status
        publishedAt
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
    }
  }
`;
