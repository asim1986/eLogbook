import { gql } from "@apollo/client";

export const CREATE_LOG = gql`
  mutation Eligible($registerInput: EligibleInput!) {
    eligible(registerInput: $registerInput) {
      eligible {
        coordinator {
          email
          id
          firstName
          lastName
          staffID
        }
        supervisor {
          firstName
          lastName
          staffID
          email
        }
        id
        department
        institute
        level
        matricNo
      }
      message
      status
    }
  }
`;

export const UPDATE_ELIG = gql`
  mutation UpdateEligible($updateInput: UpdateEligibleInput!) {
    updateEligible(updateInput: $updateInput) {
      message
      status
      eligible {
        coordinator {
          id
          email
          firstName
          lastName
        }
        supervisor {
          id
          email
          firstName
          lastName
        }
        id
        department
        institute
        level
        matricNo
      }
    }
  }
`;

export const DELETE_ELIG = gql`
  mutation DeleteEligible($deleteInput: DelEligibleInput!) {
    deleteEligible(deleteInput: $deleteInput) {
      message
      status
    }
  }
`;
