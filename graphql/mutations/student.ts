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
      }
      status
      message
    }
  }
`;

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
