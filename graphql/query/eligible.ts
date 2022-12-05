import { gql } from "@apollo/client";

export const ELIGIBLE = gql`
  query Eligible($eligibleId: ID!) {
    eligible(id: $eligibleId) {
      id
      institute
      department
      level
      matricNo
    }
  }
`;

export const GET_ELIGIBLES_DEPT = gql`
  query EligiblesByDept($input: EligDeptsInput!) {
    eligiblesByDept(input: $input) {
      id
      institute
      department
      level
      supervisor {
        id
        title
        firstName
        lastName
        email
      }
      matricNo
      createdAt
    }
  }
`;
