import React from "react";
import PropTypes from "prop-types";
import Card from "antd/lib/card";

/**
 * Note Card
 * @param {object} note
 * @param {func} onNoteClick
 */
const Note = ({ note, onNoteClick }) => (
  <Card
    title={note.title}
    style={{ marginTop: "1em" }}
    hoverable
    onClick={() => onNoteClick(note.title, note.description, note.id)}
  >
    <p>{note.description}</p>
  </Card>
);

Note.proptype = {
  note: PropTypes.object,
  onNoteClick: PropTypes.func,
};
export default Note;
