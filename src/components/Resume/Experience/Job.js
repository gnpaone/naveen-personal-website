import React from "react";
import PropTypes from "prop-types";

const Job = ({ data }) => (
  <article className="jobs-container">
    <header>
      <h4>
        <a class="mail-link-new" href={data.link}>
          {data.company}
        </a>{" "}
        - {data.position}
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

Job.propTypes = {
  data: PropTypes.shape({
    link: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    daterange: PropTypes.string.isRequired,
    points: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Job;
