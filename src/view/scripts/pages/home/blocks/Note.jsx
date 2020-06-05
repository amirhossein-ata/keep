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
    <Card.Grid
      style={{ width: "100%" }}
      hoverable={false}
      onClick={() => onNoteClick(note)}
    >
      {note.title === "" && note.title === "" ? (
        <h3>Empty note</h3>
      ) : (
        <React.Fragment>
          <h3>{note.title}</h3>
          <p>{note.description}</p>
        </React.Fragment>
      )}
    </Card.Grid>
  </Card>
);

Note.proptype = {
  note: PropTypes.object,
  onNoteClick: PropTypes.func,
  onDelete: PropTypes.func,
};
export default Note;
