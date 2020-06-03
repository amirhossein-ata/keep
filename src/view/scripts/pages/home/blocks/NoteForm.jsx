import React from "react";
import PropTypes from "prop-types";

//antd imports
import Form from "antd/lib/form";
import Input from "antd/lib/input";

const NoteForm = ({
  title,
  setTitle,
  description,
  setDescription,
  checkHashtag,
}) => {
  return (
    <Form>
      <Form.Item>
        <Input
          placeholder="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Input
          name="description"
          placeholder="Take a note..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Item>
    </Form>
  );
};

NoteForm.proptype = {
  title: PropTypes.string,
  setTitle: PropTypes.func,
  description: PropTypes.string,
  setDescription: PropTypes.func,
  checkHashtag: PropTypes.func,
};

export default NoteForm;
