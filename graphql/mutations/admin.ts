import { gql } from "@apollo/client";

export const REGISTER_ADMIN = gql`
  mutation Admin($registerInput: AdminInput!) {
    admin(registerInput: $registerInput) {
      accessToken
      refreshToken
      admin {
        id
        firstName
        lastName
        email
        password
        avatar
        user
      }
    }
  }
`;
