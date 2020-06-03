/* eslint-disable brace-style */
/**
 * @module Sagas/MediaCategory
 * @desc media categories saga
 */
import { all, put, takeLatest } from "redux-saga/effects";
import { v4 as uuid } from "uuid";

import { ActionTypes } from "core/constants/actionTypes";

/**
 * get list of notes
 * triggers in response to GET_NOTES_REQUEST
 * and in case of success puts GET_NOTES_SUCCESS
 * and in case of failure puts GET_NOTES_FAILURE
 */
export function* getNotesRequest({ payload }) {
  try {
    setTimeout(() => {
      console.log("get notes", payload.searchKeyword, payload.tags);
    }, 1000);
    yield put({
      type: ActionTypes.GET_NOTES_SUCCESS,
      payload: {
        notes: [],
      },
    });
  } catch (err) {
    yield put({
      type: ActionTypes.GET_NOTES_FAILURE,
    });
  }
}

/**
 * add note
 * triggers in response to ADD_NOTE_REQUEST
 * and in case of success puts ADD_NOTE_SUCCESS
 * and in case of failure puts ADD_NOTE_FAILURE
 */
export function* addNote({ payload }) {
  try {
    setTimeout(() => {
      console.log("added note", payload.title, payload.description);
    }, 1000);
    yield put({
      type: ActionTypes.ADD_NOTE_SUCCESS,
      payload: {
        note: {
          id: uuid(),
          title: payload.title,
          description: payload.description,
        },
      },
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ActionTypes.ADD_NOTE_FAILURE,
    });
  }
}

/**
 * edit note
 * triggers in response to EDIT_NOTE_REQUEST
 * and in case of success puts EDIT_NOTE_SUCCESS
 * and in case of failure puts EDIT_NOTE_FAILURE
 */
export function* editNote({ payload }) {
  try {
    setTimeout(() => {
      console.log("edit note", payload.title, payload.description, payload.id);
    }, 1000);
    yield put({
      type: ActionTypes.EDIT_NOTE_SUCCESS,
      payload: {
        note: {
          id: payload.id,
          title: payload.title,
          description: payload.description,
        },
      },
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ActionTypes.ADD_NOTE_FAILURE,
    });
  }
}

/**
 * delete note
 * triggers in response to DELETE_NOTE_REQUEST
 * and in case of success puts DELETE_NOTE_SUCCESS
 * and in case of failure puts DELETE_NOTE_FAILURE
 */
export function* deleteNote({ payload }) {
  try {
    setTimeout(() => {
      console.log("delete note", payload.id);
    }, 1000);
    yield put({
      type: ActionTypes.DELETE_NOTE_SUCCESS,
      payload: {
        note: {
          id: payload.id,
        },
      },
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ActionTypes.DELETE_NOTE_FAILURE,
    });
  }
}
export default function* root() {
  yield all([
    takeLatest(ActionTypes.GET_NOTES_REQUEST, getNotesRequest),
    takeLatest(ActionTypes.ADD_NOTE_REQUEST, addNote),
    takeLatest(ActionTypes.EDIT_NOTE_REQUEST, editNote),
    takeLatest(ActionTypes.DELETE_NOTE_REQUEST, deleteNote),
  ]);
}
