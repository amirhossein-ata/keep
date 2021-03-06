/* eslint-disable no-confusing-arrow */
/**
 * @module Reducers/Note
 * @desc Notes Reducers
 */
import immutable from "immutability-helper";
import { ActionTypes } from "core/constants/actionTypes";
/**
 * initial state
 * @property {string} loadNotesStatus -load status of Notes list
 * @property {string} addNoteStatus -load status of adding note to list
 * @property {string} editNoteStatus -load status of editing note
 * @property {string} deleteNoteStatus -load status of deleting note
 * @property {array} list -notes list
 * @property {array} hashtagsList -hashtags list
 * @property {array} selectedHashtags -list of selected hashtags
 * @property {string} searchKeyword -keyword to search between notes
 * @property {object} note -selected note to edit
 * @property {boolean} showEditModal -flag to set edit modal visible
 */
const initialState = {
  loadNotesStatus: "idle",
  addNoteStatus: "idle",
  editNoteStatus: "idle",
  deleteNoteStatus: "idle",
  list: [],
  selectedHashtags: [],
  hashtagsList: [],
  searchKeyword: "",
  note: null,
  showEditModal: false,
};

function getReorderedList(list, source, destination) {
  const note = list[source.index];
  list.splice(source.index, 1);
  list.splice(destination.index, 0, note);
  return list;
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    /**
     * reducer after get notes request
     */
    case ActionTypes.GET_NOTES_REQUEST:
      return immutable(state, {
        loadNotesStatus: { $set: "running" },
      });
    /**
     * reducer after get notes success
     */
    case ActionTypes.GET_NOTES_SUCCESS:
      return immutable(state, {
        loadNotesStatus: { $set: "loaded" },
        list: { $set: payload.notes },
        hashtagsList: { $set: payload.hashtags },
      });
    /**
     * reducer after get notes failure
     */
    case ActionTypes.GET_NOTES_FAILURE:
      return immutable(state, {
        loadNotesStatus: { $set: "error" },
      });
    /**
     * reducer after add notes request
     */
    case ActionTypes.ADD_NOTE_REQUEST:
      return immutable(state, {
        addNoteStatus: { $set: "running" },
      });
    /**
     * reducer after add notes success
     */
    case ActionTypes.ADD_NOTE_SUCCESS:
      const newList = [payload.note, ...state.list];
      return immutable(state, {
        addNoteStatus: { $set: "loaded" },
        list: { $set: newList },
        hashtagsList: { $push: payload.note.hashtags },
      });
    /**
     * reducer after add notes failure
     */
    case ActionTypes.ADD_NOTE_FAILURE:
      return immutable(state, {
        addNoteStatus: { $set: "error" },
      });
    /**
     * reducer to set selected note to edit
     */
    case ActionTypes.SET_SELECTED_NOTE_TO_EDIT:
      return immutable(state, {
        note: { $set: payload.note },
        showEditModal: { $set: true },
      });
    /**
     * reducer after edit notes request
     */
    case ActionTypes.EDIT_NOTE_REQUEST:
      return immutable(state, {
        editNoteStatus: { $set: "running" },
      });
    /**
     * reducer after edit notes success
     */
    case ActionTypes.EDIT_NOTE_SUCCESS:
      const editedList = state.list.map((note) => {
        if (note.id === payload.note.id) {
          return immutable(note, {
            title: { $set: payload.note.title },
            description: { $set: payload.note.description },
          });
        }
        return note;
      });
      const hashtags = [
        ...new Set([...state.hashtagsList, ...payload.note.hashtags]),
      ];
      return immutable(state, {
        editNoteStatus: { $set: "loaded" },
        list: { $set: editedList },
        hashtagsList: { $set: hashtags },
        showEditModal: { $set: false },
        note: { $set: null },
      });
    /**
     * reducer after edit notes failure
     */
    case ActionTypes.EDIT_NOTE_FAILURE:
      return immutable(state, {
        editNoteStatus: { $set: "error" },
      });
    /**
     * reducer after delete notes request
     */
    case ActionTypes.DELETE_NOTE_REQUEST:
      return immutable(state, {
        deleteNoteStatus: { $set: "running" },
      });
    /**
     * reducer after delete notes success
     */
    case ActionTypes.DELETE_NOTE_SUCCESS:
      const filteredList = state.list.filter(
        (note) => note.id !== payload.note.id
      );
      return immutable(state, {
        deleteNoteStatus: { $set: "loaded" },
        list: { $set: filteredList },
      });
    /**
     * reducer after delete notes failure
     */
    case ActionTypes.DELETE_NOTE_FAILURE:
      return immutable(state, {
        deleteNoteStatus: { $set: "error" },
      });
    /**
     * reducer for filtering notes by searchKeyword
     */
    case ActionTypes.FILTER_BY_SEARCHKEYWORD:
      return immutable(state, {
        searchKeyword: { $set: payload.searchKeyword },
      });
    /**
     * reducer for filtering notes by hashtags
     */
    case ActionTypes.FILTER_BY_HASHTAGS:
      return immutable(state, {
        selectedHashtags: { $set: [...new Set([...payload.hashtags])] },
      });
    /**
     * reducer for rordering notes
     */
    case ActionTypes.REORDER_NOTES:
      return immutable(state, {
        list: {
          $set: getReorderedList(
            [...state.list],
            payload.source,
            payload.destination
          ),
        },
      });
    default:
      return state;
  }
};
