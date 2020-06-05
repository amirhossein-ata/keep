/* eslint-disable no-confusing-arrow */
/**
 * @module Reducers/Campaign
 * @desc Campaigns Reducers
 */
import immutable from "immutability-helper";
import { ActionTypes } from "core/constants/actionTypes";
/**
 * campaign initial state
 * @property {string} statusCmpList -load status of campagins list and customers list
 * @property {boolean} object.telegramDisabled - if telegram social is active or not
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
    case ActionTypes.GET_NOTES_REQUEST:
      return immutable(state, {
        loadNotesStatus: { $set: "running" },
      });
    case ActionTypes.GET_NOTES_SUCCESS:
      return immutable(state, {
        loadNotesStatus: { $set: "loaded" },
        list: { $set: payload.notes },
        hashtagsList: { $set: payload.hashtags },
      });

    case ActionTypes.GET_NOTES_FAILURE:
      return immutable(state, {
        loadNotesStatus: { $set: "error" },
      });
    case ActionTypes.ADD_NOTE_REQUEST:
      return immutable(state, {
        addNoteStatus: { $set: "running" },
      });
    case ActionTypes.ADD_NOTE_SUCCESS:
      return immutable(state, {
        addNoteStatus: { $set: "loaded" },
        list: { $push: [payload.note] },
        hashtagsList: { $push: payload.note.hashtags },
      });

    case ActionTypes.ADD_NOTE_FAILURE:
      return immutable(state, {
        addNoteStatus: { $set: "error" },
      });
    case ActionTypes.SET_SELECTED_NOTE_TO_EDIT:
      return immutable(state, {
        note: { $set: payload.note },
        showEditModal: { $set: true },
      });
    case ActionTypes.EDIT_NOTE_REQUEST:
      return immutable(state, {
        editNoteStatus: { $set: "running" },
      });
    case ActionTypes.EDIT_NOTE_SUCCESS:
      const editedList = state.list.map((note) => {
        if (note.id === payload.note.id) {
          return {
            id: note.id,
            title: payload.note.title,
            description: payload.note.description,
          };
        }
        return note;
      });
      return immutable(state, {
        editNoteStatus: { $set: "loaded" },
        list: { $set: editedList },
        hashtagsList: { $push: payload.note.hashtags },
        showEditModal: { $set: false },
        note: { $set: null },
      });

    case ActionTypes.EDIT_NOTE_FAILURE:
      return immutable(state, {
        editNoteStatus: { $set: "error" },
      });
    case ActionTypes.DELETE_NOTE_REQUEST:
      return immutable(state, {
        deleteNoteStatus: { $set: "running" },
      });

    case ActionTypes.DELETE_NOTE_SUCCESS:
      const filteredList = state.list.filter(
        (note) => note.id !== payload.note.id
      );
      return immutable(state, {
        deleteNoteStatus: { $set: "loaded" },
        list: { $set: filteredList },
      });

    case ActionTypes.DELETE_NOTE_FAILURE:
      return immutable(state, {
        deleteNoteStatus: { $set: "error" },
      });

    case ActionTypes.FILTER_BY_SEARCHKEYWORD:
      return immutable(state, {
        searchKeyword: { $set: payload.searchKeyword },
      });

    case ActionTypes.FILTER_BY_HASHTAGS:
      return immutable(state, {
        selectedHashtags: { $set: [...new Set([...payload.hashtags])] },
      });
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
