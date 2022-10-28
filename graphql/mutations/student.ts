import { gql } from "@apollo/client";

export const REGISTER_STUDENT = gql`
  mutation Student($registeredInput: StudentInput!) {
    student(registerInput: $registeredInput) {
      accessToken
      refreshToken
      student {
        id
        firstName
        lastName
        email
        matricNo
        phone
        level
        user
        avatar
        address
        institute
        department
        gender
        place
        eligible
      }
      status
      message
    }
  }
`;
