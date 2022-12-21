import { gql } from "@apollo/client";

export const CREATE_ELIG = gql`
  mutation Eligible($registerInput: EligibleInput!) {
    eligible(registerInput: $registerInput) {
      message
      status
      eligible {
        id
        institute
        department
        level
        matricNo
        createdAt
        supervisor {
          id
          title
          firstName
          lastName
          email
        }
      }
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
      eligible {
        id
        matricNo
      }
    }
  }
`;
