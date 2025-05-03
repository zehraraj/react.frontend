import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { fork } from "redux-saga/effects";

// Reducers
import adminReducer from "./middleware/reducers/adminReducer";
import vendorReducer from "./middleware/reducers/vendorReducer";
import customerReducer from "./middleware/reducers/customerReducer";

// Sagas
import { completeSaga as adminSagas } from "./middleware/sagas/adminSaga";
import { completeSaga as vendorSagas } from "./middleware/sagas/vendorSaga";
import { completeSaga as customerSagas } from "./middleware/sagas/customerSaga";

// Root Reducer
const rootReducer = combineReducers({
  adminReducer: adminReducer,
  vendorReducer: vendorReducer,
  customerReducer: customerReducer,
});

// Creating Saga Middleware
const sagas = createSagaMiddleware();

// Root Saga
function* rootSaga() {
  yield fork(adminSagas);
  yield fork(vendorSagas);
  yield fork(customerSagas);
}

// Creating Redux Store With Saga
const store = createStore(rootReducer, applyMiddleware(sagas));

sagas.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
