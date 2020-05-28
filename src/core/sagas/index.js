import { all, fork } from "redux-saga/effects";

import notes from "./notes";

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(notes)]);
}
