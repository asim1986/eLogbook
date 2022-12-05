import { gql } from "@apollo/client";

export const REGISTER_STUDENT = gql`
  mutation Student($registeredInput: StudentInput!) {
    student(registerInput: $registeredInput) {
      accessToken
      refreshToken
      status
      message
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
        avatar
        eligible
        user
        supervisor {
          id
          title
          firstName
          lastName
          email
          phone
          avatar
        }
        coordinator {
          id
          title
          firstName
          lastName
          email
          phone
          avatar
        }
        organisation {
          id
          name
          sector
          email
          logo
          address
        }
      }
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
        avatar
        eligible
        user
        supervisor {
          id
          title
          firstName
          lastName
          email
          phone
          avatar
        }
        coordinator {
          id
          title
          firstName
          lastName
          email
          phone
          avatar
        }
        organisation {
          id
          name
          sector
          email
          logo
          address
        }
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
