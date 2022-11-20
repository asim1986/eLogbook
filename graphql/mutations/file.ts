import { gql } from "@apollo/client";

export const DELETE_FILE = gql`
  mutation DeleteFile($deleteInput: ID!) {
    deleteFile(deleteInput: $deleteInput) {
      message
      status
      imageUrl
    }
  }
`;
