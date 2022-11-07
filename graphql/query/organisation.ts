import { gql } from "@apollo/client";

export const LOGIN_ORGAN = gql`
  query LoginOrganisation($loginInput: LoginInput!) {
    loginOrganisation(loginInput: $loginInput) {
      status
      message
      accessToken
      refreshToken
      organisation {
        id
        name
        sector
        phone
        address
        employees
        email
        password
        logo
        user
      }
    }
  }
`;
