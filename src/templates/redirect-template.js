import { graphql } from "gatsby";

export default ({ data }) => {
  const { redirectsJson } = data;
  window.location.replace(redirectsJson.to);
  return null;
};

export const redirectQuery = graphql`
  query($from: String!) {
    redirectsJson(from: { eq: $from }) {
      from
      to
    }
  }
`;
