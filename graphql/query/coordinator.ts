import { gql } from "@apollo/client";

export const LOGIN_COORD = gql`
  query LoginCoordinator($loginInput: LoginInput!) {
    loginCoordinator(loginInput: $loginInput) {
      status
      message
      accessToken
      refreshToken
      coordinator {
        id
        title
        firstName
        lastName
        staffID
        phone
        institute
        department
        gender
        email
        password
        avatar
        user
      }
    }
  }
`;
