import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootSaga from "core/sagas/index";
import reducer from "core/reducers/index";

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

/* istanbul ignore next */
if (process.env.NODE_ENV === "development") {
  const { createLogger } = require("redux-logger");

  middleware.push(createLogger({ collapsed: true }));
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* istanbul ignore next */
const configStore = (initialState = {}) => {
  const createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(...middleware)
  )(createStore);

  const store = createStoreWithMiddleware(reducer, initialState);

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configStore();
