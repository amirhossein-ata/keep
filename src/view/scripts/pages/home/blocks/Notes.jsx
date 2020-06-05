import React from "react";
import PropTypes from "prop-types";
//actions
import { selectNoteToEdit, deleteNote } from "core/actions/note";
//helpers
import { getHashtags } from "core/modules/helpers";

//components
import Note from "./Note";
import EditNote from "./EditNote";

const Notes = ({ notes, dispatch }) => {
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

  //open edit note modal
  const handleNoteClick = (note) => {
    dispatch(selectNoteToEdit(note));
  };
  //delete note
  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id));
  };

  const {
    loadNotesStatus,
    list,
    searchKeyword,
    selectedHashtags,
    note,
    showEditModal,
  } = notes;

  return (
    <div>
      {loadNotesStatus === "loaded" && (
        <React.Fragment>
          {showEditModal && (
            <EditNote note={note} isOpen={showEditModal} dispatch={dispatch} />
          )}
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
    </div>
  );
};

Notes.proptype = {
  notes: PropTypes.object,
  dispatch: PropTypes.func,
};
export default Notes;
