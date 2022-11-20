import { gql } from "@apollo/client";

export const LOGIN_STUDENT = gql`
  query LoginStudent($loginInput: LoginInput!) {
    loginStudent(loginInput: $loginInput) {
      message
      student {
        matricNo
        id
        firstName
        lastName
        phone
        address
        institute
        department
        level
        gender
        place
        email
        avatar
        eligible
        user
        organisation {
          id
          email
        }
      }
      accessToken
      refreshToken
    }
  }
`;
