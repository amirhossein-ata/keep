import React, { useState } from "react";
import PropTypes from "prop-types";
//helpers
import { getHashtags } from "core/modules/helpers";
//actions
import { editNote } from "core/actions/note";
//antd imports
import Modal from "antd/lib/modal";

//components
import NoteForm from "./NoteForm";

const EditNote = ({ note, isOpen, dispatch }) => {
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);

  //close edit note modal
  const handleEditNoteClose = () => {
    const hashtags = getHashtags(`${title} ${description}`);
    dispatch(editNote(title, description, note.id, hashtags));
  };

  return (
    <Modal
      className="editModal"
      title=""
      footer={null}
      visible={isOpen}
      onCancel={handleEditNoteClose}
      closable={false}
    >
      <div className="noteForm">
        <NoteForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          onClose={handleEditNoteClose}
        />
      </div>
    </Modal>
  );
};
EditNote.proptype = {
  note: PropTypes.object,
  isOpen: PropTypes.bool,
  dispatch: PropTypes.func,
};
export default EditNote;
