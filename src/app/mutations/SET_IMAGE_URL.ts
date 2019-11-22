import gql from "graphql-tag";

const SET_IMAGE_URL = gql`
  mutation setImageUrl($id: Int!, $imageUrl: String!) {
    setImageUrl(id: $id, imageUrl: $imageUrl) @client
  }
`;

export default SET_IMAGE_URL;
