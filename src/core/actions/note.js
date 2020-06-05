import { ActionTypes } from "core/constants/actionTypes";

export const addNote = (title, description, hashtags) => ({
  type: ActionTypes.ADD_NOTE_REQUEST,
  payload: { title, description, hashtags },
});

export const getNotes = (searchKeyword, tags) => ({
  type: ActionTypes.GET_NOTES_REQUEST,
  payload: { searchKeyword, tags },
});

export const editNote = (title, description, id, hashtags) => ({
  type: ActionTypes.EDIT_NOTE_REQUEST,
  payload: { title, description, id, hashtags },
});

export const deleteNote = (id) => ({
  type: ActionTypes.DELETE_NOTE_REQUEST,
  payload: { id },
});

export const filterBySearchKeyword = (searchKeyword) => ({
  type: ActionTypes.FILTER_BY_SEARCHKEYWORD,
  payload: { searchKeyword },
});

export const filterByHashtags = (hashtags) => ({
  type: ActionTypes.FILTER_BY_HASHTAGS,
  payload: { hashtags },
});

export const selectNoteToEdit = (note) => ({
  type: ActionTypes.SET_SELECTED_NOTE_TO_EDIT,
  payload: { note },
});

export const reorderNotes = (source, destination) => ({
  type: ActionTypes.REORDER_NOTES,
  payload: { source, destination },
});
