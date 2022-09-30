import { gql } from "@apollo/client";

const UPDATE_AVATAR = gql`
  mutation UpdateAvatar($testInput: testAva) {
    updateAvatar(testInput: $testInput) {
      message
      imageUrl
      status
    }
  }
`;

export default UPDATE_AVATAR;
