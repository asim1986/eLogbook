import { gql } from "@apollo/client";

export const DELETE_FILE = gql`
  mutation DeleteFile($deleteInput: FileDelInput!) {
    deleteFile(deleteInput: $deleteInput) {
      message
      imageUrl
      status
      actId
    }
  }
`;
