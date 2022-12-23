import { gql } from "@apollo/client";

export const LOGIN_ADMIN = gql`
  query LoginAdmin($loginInput: LoginInput!) {
    loginAdmin(loginInput: $loginInput) {
      status
      message
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
