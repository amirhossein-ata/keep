import React from "react";
import PropTypes from "prop-types";

//antd imports
import Modal from "antd/lib/modal";

//components
import NoteForm from "./NoteForm";

const EditNote = ({
  title,
  description,
  setTitle,
  setDescription,
  isOpen,
  onCancel,
}) => (
  <Modal
    title=""
    footer={null}
    visible={isOpen}
    onCancel={onCancel}
    closable={false}
  >
    <NoteForm
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
    />
  </Modal>
);

EditNote.proptype = {
  title: PropTypes.string,
  setTitle: PropTypes.func,
  description: PropTypes.string,
  setDescription: PropTypes.func,
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
};
export default EditNote;
