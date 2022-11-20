import { gql } from "@apollo/client";

export const CREATE_LOG = gql`
  mutation Logbook($input: LogbookInput!) {
    logbook(input: $input) {
      status
      message
      logbook {
        id
        day
        title
        description
        label
        diagram
        approved
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
        }
      }
    }
  }
`;

export const UPDATE_LOG = gql`
  mutation UpdateLogbook($input: UpdateLogbookInput!) {
    updateLogbook(input: $input) {
      status
      message
      logbook {
        id
        day
        title
        description
        label
        diagram
        approved
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
        }
      }
    }
  }
`;

export const DELETE_LOG = gql`
  mutation DeleteLogbook($input: DelLogbookInput!) {
    deleteLogbook(input: $input) {
      message
      status
    }
  }
`;
