import { gql } from "@apollo/client";

export const REGISTER_SUP = gql`
  mutation Supervisor($registerInput: SupervisorInput!) {
    supervisor(registerInput: $registerInput) {
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
        avatar
        user
      }
    }
  }
`;

export const UPDATE_SUP = gql`
  mutation UpdateSupervisor($updateInput: UpdateSupervisorInput!) {
    updateSupervisor(updateInput: $updateInput) {
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
        avatar
        user
      }
    }
  }
`;

export const DELETE_SUP = gql`
  mutation DeleteSupervisor($emailInput: DeleteSupervisorInput!) {
    deleteSupervisor(emailInput: $emailInput) {
      id
      staffID
      status
      message
    }
  }
`;
