import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//actions
import {
  addNote,
  getNotes,
  editNote,
  deleteNote,
  filterByHashtags,
  filterBySearchKeyword,
} from "core/actions/note";
//helpers
import { useOutsideChecker, getHashtags } from "core/modules/helpers";
//antd imports
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Button from "antd/lib/button";
//components
import Note from "./blocks/Note";
import NoteForm from "./blocks/NoteForm";
import EditNote from "./blocks/EditNote";
import HashtagsList from "./blocks/HashtagsList";
import SearchInput from "./blocks/Search";

const Notes = ({ notes, dispatch }) => {
  const [newNoteMode, setNewNoteMode] = useState("idle");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [showEditMoal, setShowEdittModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const { loadNotesStatus, list, hashtagsList, selectedHashtags } = notes;
  const onNewNoteClick = () => setNewNoteMode("typing");

  //get notes when component loaded
  useEffect(() => {
    dispatch(getNotes());
  }, []);

  const onAddNote = () => {
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

  //open edit note modal
  const handleNoteClick = (noteTitle, noteDescription, noteId) => {
    setShowEdittModal(true);
    setTitle(noteTitle);
    setDescription(noteDescription);
    setId(noteId);
  };

  //close edit note modal
  const handleEditNoteClose = () => {
    const hashtags = getHashtags(`${title} ${description}`);
    setShowEdittModal(false);
    dispatch(editNote(title, description, id, hashtags));
    setTitle("");
    setDescription("");
    setId("");
  };

  //delete note
  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id));
  };

  //filter by tags
  const handleHashtagClick = (hashtag) => {
    dispatch(filterByHashtags([...new Set([...selectedHashtags, hashtag])]));
  };

  //search by keyword
  const handleSearch = (e) => {
    dispatch(filterBySearchKeyword(e.target.value));
  };

  //delete hashtag
  const handleDeleteHashtag = (hashtag) => {
    const newHashtags = selectedHashtags.filter((i) => i !== hashtag);
    dispatch(filterByHashtags(newHashtags));
  };

  //get filtered list of notes
  const filterList = (list, searchKeyword, hashtags) => {
    const notesWithSearchKeyword = list.filter((note) => {
      return (
        note.title.includes(searchKeyword) ||
        note.description.includes(searchKeyword)
      );
    });
    const hashtagsSet = [...new Set(hashtags)];
    const notesWithHashtags = notesWithSearchKeyword.filter((note) => {
      const noteHashtags = getHashtags(`${note.title} ${note.description}`);
      if (hashtagsSet.length === 0) {
        return true;
      }

      return (
        hashtagsSet.filter((value) => noteHashtags.includes(value)).length !== 0
      );
    });
    return notesWithHashtags;
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
      <Row
        gutter={24}
        justify="center"
        style={{ marginTop: "2em", padding: "2em" }}
      >
        <Col span={4}>
          <div style={{ marginBottom: "2em" }}>
            <SearchInput
              value={searchKeyword}
              setValue={setSearchKeyword}
              onSearch={handleSearch}
            />
          </div>
          <HashtagsList
            selectedHashtags={selectedHashtags}
            hashtags={hashtagsList}
            onHashtagClick={handleHashtagClick}
            onDeleteHashtag={handleDeleteHashtag}
          />
        </Col>
        <Col span={5} />

        <Col span={10}>
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
              {filterList(list, searchKeyword, selectedHashtags).map(
                (note, index) => (
                  <Note
                    key={index}
                    note={note}
                    onNoteClick={handleNoteClick}
                    onDelete={handleDeleteNote}
                  />
                )
              )}
            </React.Fragment>
          )}
        </Col>
        <Col span={5} />
      </Row>
    </div>
  );
};

Notes.proptype = {
  notes: PropTypes.object,
};

const mapStateToProps = (state) => ({ notes: state.note });

export default connect(mapStateToProps)(Notes);
