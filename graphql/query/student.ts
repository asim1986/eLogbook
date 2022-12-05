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
      accessToken
      refreshToken
    }
  }
`;

export const GET_STUD_LOG = gql`
  query Student($studentId: ID!) {
    student(id: $studentId) {
      logbooks {
        id
        actId
        day
        title
        description
        label
        diagram
        approved
        createdAt
      }
    }
  }
`;
