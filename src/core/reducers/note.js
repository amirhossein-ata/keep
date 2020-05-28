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
  notes: [],
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
        notes: { $set: payload.notes },
      });

    case ActionTypes.GET_NOTES_FAILURE:
      return immutable(state, {
        loadNotesStatus: { $set: "error" },
      });

    default:
      return state;
  }
};
