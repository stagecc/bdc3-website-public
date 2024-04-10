import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

export const TagLink = ({ tag }) => (
  <Link to={`/tagged/${tag}`} className="tag">
    {tag}
  </Link>
);

TagLink.propTypes = {
  tag: PropTypes.string.isRequired,
};
