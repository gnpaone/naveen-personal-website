import React from "react";
import PropTypes from 'prop-types';

var he = require("he");

const Message = (props) => {
  return (<div className={props.speaks === "me" ? "right-align" : ""}>
    <div className={`chatbubble ${props.speaks === "bot" ? "bot" : "me"}`}>
      {props.speaks === "bot" ? (
        <span dangerouslySetInnerHTML={{ __html: he.decode(props.text[0]) }} />
      ) : (
        <span>{props.text}</span>
      )}
    </div>
  </div>
  )
};

export default Message;

Message.propTypes = {
  speaks: PropTypes.string,
  text: PropTypes.string
};
