import React from "react";
import PropTypes from "prop-types";
import Card from "antd/lib/card";

/**
 * Note Card
 * @param {string} title
 * @param {string} description
 */
const Note = ({ title, description }) => (
  <Card title={title} style={{ marginTop: "1em" }}>
    <p>{description}</p>
  </Card>
);

Note.proptype = {
  title: PropTypes.string,
  description: PropTypes.string,
};
export default Note;
