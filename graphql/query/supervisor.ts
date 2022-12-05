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

export const GET_SUP_DEPT = gql`
  query SupervisorsByDepts($input: SupByDeptsInput!) {
  supervisorsByDepts(input: $input) {
    id
    title
    firstName
    lastName
    email
  }
}
`;
