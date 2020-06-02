import { ActionTypes } from "core/constants/actionTypes";

export const addNote = (title, description) => ({
  type: ActionTypes.ADD_NOTE_REQUEST,
  payload: { title, description },
});

export const getNotes = (searchKeyword, tags) => ({
  type: ActionTypes.GET_NOTES_REQUEST,
  payload: { searchKeyword, tags },
});
