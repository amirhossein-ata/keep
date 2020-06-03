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
import EditNote from "./Blocks/EditNote";

//actions
import { addNote, getNotes, editNote } from "core/actions/note";

//helpers
import { useOutsideChecker } from "core/modules/helpers";

const Notes = ({ notes, dispatch }) => {
  const [newNoteMode, setNewNoteMode] = useState("idle");
  const onNewNoteClick = () => setNewNoteMode("typing");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [showEditMoal, setShowEdittModal] = useState(false);

  const { loadNotesStatus, list } = notes;

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

  //open edit note modal
  const handleNoteClick = (noteTitle, noteDescription, noteId) => {
    setShowEdittModal(true);
    setTitle(noteTitle);
    setDescription(noteDescription);
    setId(noteId);
  };

  //close edit note modal
  const handleEditNoteClose = () => {
    setShowEdittModal(false);
    dispatch(editNote(title, description, id));
    setTitle("");
    setDescription("");
    setId("");
  };

  // setup refrences to check if outside of new note form is clicked
  const newNoteRef = useRef(null);
  useOutsideChecker(newNoteRef, handleCloseNewNoteForm);

  return (
    <div>
      <EditNote
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        isOpen={showEditMoal}
        onCancel={handleEditNoteClose}
      />
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
                <Note key={index} note={note} onNoteClick={handleNoteClick} />
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
