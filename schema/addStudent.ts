import { gql } from "@apollo/client";

const ADD_STUDENT = gql`
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
      }
      status
      message
    }
  }
`;

export default ADD_STUDENT;
