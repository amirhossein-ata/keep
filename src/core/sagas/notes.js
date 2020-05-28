/* eslint-disable brace-style */
/**
 * @module Sagas/MediaCategory
 * @desc media categories saga
 */
import { all, call, put, takeLatest } from "redux-saga/effects";

import { ActionTypes } from "core/constants/actionTypes";

/**
 * triggers in response to GET_NOTES_REQUEST
 * and in case of success puts GET_NOTES_SUCCESS
 * and in case of failure puts GET_NOTES_FAILURE
 * get list of notes
 */
export function* getNotesRequest({ payload }) {
  try {
    console.log("get notes request", payload);
  } catch (err) {
    console.log(err);
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.GET_NOTES_REQUEST, getNotesRequest)]);
}
