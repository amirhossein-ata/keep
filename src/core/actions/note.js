/**
 * @module Actions/Note
 * @desc Notes Actions
 */
import { ActionTypes } from "core/constants/actionTypes";

/**
 * action to send addNote request
 * @param {string} title
 * @param {string} description
 * @param {array} hashtags
 */
export function addNote(title, description, hashtags) {
  return {
    type: ActionTypes.ADD_NOTE_REQUEST,
    payload: { title, description, hashtags },
  };
}

/**
 * actions to send getNote request
 * @param {string} searchKeyword
 * @param {tags} tags
 */
export function getNotes(searchKeyword, tags) {
  return {
    type: ActionTypes.GET_NOTES_REQUEST,
    payload: { searchKeyword, tags },
  };
}

/**
 * action send editNote request
 * @param {string} title
 * @param {string} description
 * @param {string} id
 * @param {array} hashtags
 */
export function editNote(title, description, id, hashtags) {
  return {
    type: ActionTypes.EDIT_NOTE_REQUEST,
    payload: { title, description, id, hashtags },
  };
}

/**
 * action to send delete note request
 * @param {string} id
 */
export function deleteNote(id) {
  return {
    type: ActionTypes.DELETE_NOTE_REQUEST,
    payload: { id },
  };
}

/**
 * action to filter notes by keyword
 * @param {string} searchKeyword
 */
export function filterBySearchKeyword(searchKeyword) {
  return {
    type: ActionTypes.FILTER_BY_SEARCHKEYWORD,
    payload: { searchKeyword },
  };
}

/**
 * action filter notes by hashtags
 * @param {array} hashtags
 */
export function filterByHashtags(hashtags) {
  return {
    type: ActionTypes.FILTER_BY_HASHTAGS,
    payload: { hashtags },
  };
}

/**
 * action to select a note to edit
 * @param {object} note
 */
export function selectNoteToEdit(note) {
  return {
    type: ActionTypes.SET_SELECTED_NOTE_TO_EDIT,
    payload: { note },
  };
}

/**
 * action to reorder notes
 * @param {object} source
 * @param {object} destination
 */
export function reorderNotes(source, destination) {
  return {
    type: ActionTypes.REORDER_NOTES,
    payload: { source, destination },
  };
}
