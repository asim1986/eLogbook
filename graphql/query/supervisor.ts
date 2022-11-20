import { gql } from "@apollo/client";

export const LOGIN_SUP = gql`
  query LoginSupervisor($loginInput: LoginInput!) {
    loginSupervisor(loginInput: $loginInput) {
      status
      message
      accessToken
      refreshToken
      supervisor {
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
