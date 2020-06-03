import React from "react";
import PropTypes from "prop-types";
import Card from "antd/lib/card";
import { DeleteOutlined } from "@ant-design/icons";

/**
 * Note Card
 * @param {object} note
 * @param {func} onNoteClick
 */
const Note = ({ note, onNoteClick, onDelete }) => (
  <Card
    style={{ marginTop: "1em" }}
    hoverable
    actions={[
      <DeleteOutlined key="ellipsis" onClick={() => onDelete(note.id)} />,
    ]}
    className="note"
  >
    <div onClick={() => onNoteClick(note.title, note.description, note.id)}>
      <h3>{note.title}</h3>
      <p>{note.description}</p>
    </div>
  </Card>
);

Note.proptype = {
  note: PropTypes.object,
  onNoteClick: PropTypes.func,
};
export default Note;
