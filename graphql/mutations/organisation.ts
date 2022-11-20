import { gql } from "@apollo/client";

export const REGISTER_ORG = gql`
  mutation Organisation($registerInput: OrganisationInput!) {
    organisation(registerInput: $registerInput) {
      status
      message
      accessToken
      refreshToken
      organisation {
        id
        name
        sector
        phone
        address
        employees
        email
        password
        logo
        user
      }
    }
  }
`;

export const UPDATE_ORG = gql`
  mutation UpdateOrganisation($updateInput: UpdateOrganisationInput!) {
    updateOrganisation(updateInput: $updateInput) {
      status
      message
      accessToken
      refreshToken
      organisation {
        id
        name
        sector
        phone
        address
        employees
        email
        password
        logo
        user
      }
    }
  }
`;

export const DELETE_ORG = gql`
  mutation DeleteOrganisation($emailInput: DeleteOrganisationInput!) {
    deleteOrganisation(emailInput: $emailInput) {
      message
      id
      email
    }
  }
`;