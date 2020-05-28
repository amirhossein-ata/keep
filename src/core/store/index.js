import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootSaga from "core/sagas/index";
import rootReducer from "core/reducers/index";

const sagaMiddleware = createSagaMiddleware();

const reducer = persistReducer(
  {
    key: "keep", // key is required
    storage, // storage is now required
    whitelist: ["auth", "location", "env"],
  },
  rootReducer
);

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

  return {
    persistor: persistStore(store),
    store,
  };
};

const { store, persistor } = configStore();

export { store, persistor };
