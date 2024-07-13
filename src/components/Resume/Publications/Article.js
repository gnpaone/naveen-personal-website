import React from "react";
import PropTypes from "prop-types";

const Article = ({ data }) => (
  <article className="articles-container">
    <header>
      <h4>
        <a class="mail-link-new" href={data.link}>
          {data.title}
        </a>{" "}
        - {data.publisher}
      </h4>
      <code className="daterange" style={{ fontSize: "17px" }}>
        {" "}
        {data.daterange}
      </code>
    </header>
    <ul className="points">
      {data.points.map((point) => (
        <li key={point}>
          <p style={{ fontSize: "15px" }}>{point}</p>
        </li>
      ))}
    </ul>
  </article>
);

Article.propTypes = {
  data: PropTypes.shape({
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    daterange: PropTypes.string.isRequired,
    points: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Article;
