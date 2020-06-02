import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//antd imports
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Button from "antd/lib/button";
//components
import Note from "./Blocks/Note";
import NoteForm from "./Blocks/NoteForm";

//actions
import { addNote, getNotes } from "core/actions/note";

//helpers
import { useOutsideChecker } from "core/modules/helpers";

const Notes = ({ notes, dispatch }) => {
  const [newNoteMode, setNewNoteMode] = useState("idle");
  const onNewNoteClick = () => setNewNoteMode("typing");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //get notes when component loaded
  useEffect(() => {
    dispatch(getNotes());
  }, []);

  const onAddNote = () => {
    dispatch(addNote(title, description));
    setTitle("");
    setDescription("");
  };

  //close new note form
  const handleCloseNewNoteForm = () => {
    setNewNoteMode("idle");
    onAddNote();
  };

  // setup refrences to check if outside of new note form is clicked
  const newNoteRef = useRef(null);
  useOutsideChecker(newNoteRef, handleCloseNewNoteForm);

  const { loadNotesStatus, list } = notes;
  return (
    <div>
      <Row justify="center" style={{ marginTop: "2em" }}>
        <Col span={12}>
          {newNoteMode === "idle" ? (
            <Button onClick={onNewNoteClick}> take a note </Button>
          ) : (
            <div ref={newNoteRef}>
              <NoteForm
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
              />
            </div>
          )}
          {loadNotesStatus === "loaded" && (
            <React.Fragment>
              {list.map((note, index) => (
                <Note title={note.title} description={note.description} />
              ))}
            </React.Fragment>
          )}
        </Col>
      </Row>
    </div>
  );
};

Notes.proptype = {
  notes: PropTypes.object,
};

const mapStateToProps = (state) => ({ notes: state.note });

export default connect(mapStateToProps)(Notes);
