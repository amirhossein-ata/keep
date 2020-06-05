import React from "react";
import PropTypes from "prop-types";

//antd imports
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";

const NoteForm = ({
  title,
  setTitle,
  description,
  setDescription,
  onClose,
}) => {
  return (
    <Form>
      <Form.Item className="titleInput">
        <Input
          placeholder="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Item>
      <Form.Item className="descriptionInput">
        <Input.TextArea
          name="description"
          placeholder="Take a note..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button onClick={onClose} className="closeButton">
          Close
        </Button>
      </Form.Item>
    </Form>
  );
};

NoteForm.proptype = {
  title: PropTypes.string,
  setTitle: PropTypes.func,
  description: PropTypes.string,
  onCLose: PropTypes.func,
  setDescription: PropTypes.func,
};

export default NoteForm;
