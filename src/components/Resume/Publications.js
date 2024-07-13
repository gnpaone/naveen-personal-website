import React from "react";
import PropTypes from "prop-types";

import Article from "./Publications/Article";

const Publications = ({ data }) => (
  <div className="publications">
    <div className="link-to" id="publications" />
    <div className="title">
      <h3>Publications</h3>
    </div>
    {data.map((article) => (
      <Article data={article} key={article.company} />
    ))}
  </div>
);

Publications.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      publisher: PropTypes.string,
      link: PropTypes.string,
      daterange: PropTypes.string,
      points: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
};

Publications.defaultProps = {
  data: [],
};

export default Publications;
