import { gql } from "@apollo/client";

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($input: ChangePswInput!) {
    changePassword(input: $input) {
      message
      status
    }
  }
`;