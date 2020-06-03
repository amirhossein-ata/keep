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
  list: [],
};

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
      });

    case ActionTypes.ADD_NOTE_FAILURE:
      return immutable(state, {
        addNoteStatus: { $set: "error" },
      });
    case ActionTypes.EDIT_NOTE_REQUEST:
      return immutable(state, {
        editNoteStatus: { $set: "running" },
      });
    case ActionTypes.EDIT_NOTE_SUCCESS:
      const newList = state.list.map((note) => {
        console.log(note, payload.note);
        if (note.id === payload.note.id) {
          console.log(payload.note);
          return {
            id: note.id,
            title: payload.note.title,
            description: payload.note.description,
          };
        }
        return note;
      });
      console.log(newList);
      return immutable(state, {
        editNoteStatus: { $set: "loaded" },
        list: { $set: newList },
      });

    case ActionTypes.EDIT_NOTE_FAILURE:
      return immutable(state, {
        editNoteStatus: { $set: "error" },
      });
    default:
      return state;
  }
};
