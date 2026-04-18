import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      postDto {
        id
        title
        slug
        excerpt
        thumbnail
        status
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
