import React, { useState, useRef } from "react";
//helpers
import { useOutsideChecker, getHashtags } from "core/modules/helpers";
//actions
import { addNote } from "core/actions/note";
//antd
import { Button } from "antd";
// compnonets
import NoteForm from "./NoteForm";

const AddNewNote = ({ dispatch }) => {
  const [newNoteMode, setNewNoteMode] = useState("idle");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onNewNoteClick = () => setNewNoteMode("typing");

  const onAddNote = () => {
    if (title === "" && description === "") {
      return;
    }
    const hashtags = getHashtags(`${title} ${description}`);
    dispatch(addNote(title, description, hashtags));
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

  return (
    <React.Fragment>
      {newNoteMode === "idle" ? (
        <Button onClick={onNewNoteClick}>take a note... </Button>
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
    </React.Fragment>
  );
};

export default AddNewNote;
