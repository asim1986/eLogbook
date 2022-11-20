import { gql } from "@apollo/client";

export const REGISTER_COORD = gql`
  mutation Coordinator($registerInput: CoordinatorInput!) {
    coordinator(registerInput: $registerInput) {
      status
      message
      accessToken
      refreshToken
      coordinator {
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

export const UPDATE_COORD = gql`
  mutation UpdateCoordinator($updateInput: UpdateCoordinatorInput!) {
    updateCoordinator(updateInput: $updateInput) {
      status
      message
      accessToken
      refreshToken
      coordinator {
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

export const DELETE_CORD = gql`
  mutation DeleteCoordinator($emailInput: DeleteCoordinatorInput!) {
    deleteCoordinator(emailInput: $emailInput) {
      id
      staffID
      status
      message
    }
  }
`;
