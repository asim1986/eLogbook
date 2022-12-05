import { gql } from "@apollo/client";

export const CREATE_LOG = gql`
  mutation Logbook($input: LogbookInput!) {
    logbook(input: $input) {
      status
      message
      logbook {
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

export const UPDATE_LOG = gql`
  mutation UpdateLogbook($input: UpdateLogbookInput!) {
    updateLogbook(input: $input) {
      status
      message
      logbook {
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

export const DELETE_LOG = gql`
  mutation DeleteLogbook($input: DelLogbookInput!) {
    deleteLogbook(input: $input) {
      message
      status
      logbook {
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
