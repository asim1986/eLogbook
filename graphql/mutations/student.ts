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
        organisation {
          id
          email
        }
      }
      status
      message
    }
  }
`;

export const UPDATE_STUDENT = gql`
  mutation UpdateStudent($updateInput: UpdateStudentInput!) {
    updateStudent(updateInput: $updateInput) {
      status
      message
      accessToken
      refreshToken
      student {
        id
        firstName
        lastName
        matricNo
        phone
        address
        institute
        department
        level
        gender
        place
        email
        password
        avatar
        eligible
        user
      }
    }
  }
`;

export const DELETE_STUD = gql`
  mutation DeleteStudent($emailInput: DeleteStudentInput!) {
    deleteStudent(emailInput: $emailInput) {
      id
      message
      status
    }
  }
`;
