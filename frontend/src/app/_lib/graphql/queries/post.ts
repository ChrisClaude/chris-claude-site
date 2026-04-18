import { gql } from '@apollo/client';

export const GET_MY_POSTS = gql`
  query GetMyPosts($first: Int, $after: String) {
    myPosts(first: $first, after: $after, order: { createdAt: DESC }) {
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
        updatedAt
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

export const GET_ALL_POSTS_ADMIN = gql`
  query GetAllPostsAdmin($first: Int, $after: String) {
    allPostsAdmin(first: $first, after: $after, order: { createdAt: DESC }) {
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
        updatedAt
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
