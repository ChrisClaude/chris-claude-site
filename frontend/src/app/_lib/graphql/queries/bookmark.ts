import { gql } from '@apollo/client';

export const GET_MY_BOOKMARKS = gql`
  query GetMyBookmarks {
    myBookmarks {
      postId
      userId
      post {
        id
        title
        slug
        excerpt
        thumbnail
        publishedAt
        createdAt
        postTags {
          tag {
            id
            name
          }
        }
        author {
          id
          name
          surname
          image
        }
      }
    }
  }
`;
