import { gql } from "@apollo/client";

export const CREATE_BLOG = gql`
  mutation BlogPost($registerInput: BlogPostInput!) {
    blogPost(registerInput: $registerInput) {
      status
      message
      blogpost {
        id
        title
        content
        image
      }
    }
  }
`;

export const DELETE_BLOG = gql`
  mutation DeleteBlogPost($input: DeleteBlogPostInput!) {
    deleteBlogPost(input: $input) {
      message
      status
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation UpdateBlogPost($input: UpdateBlogPostInput!) {
    updateBlogPost(input: $input) {
      status
      message
      blogpost {
        id
        title
        content
        image
      }
    }
  }
`;
