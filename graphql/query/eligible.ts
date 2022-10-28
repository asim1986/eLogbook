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