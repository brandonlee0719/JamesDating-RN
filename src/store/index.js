import { createStore, applyMiddleware } from 'redux';
import RootReducer from './reducers';
import createSagaMiddleware from 'redux-saga'
import { createLogger } from "redux-logger"
import { Sagas } from "./sagas"

const sagaMiddleware = createSagaMiddleware()

const Store = createStore(
    RootReducer,
    {},
    applyMiddleware(
        // createLogger(),
        sagaMiddleware
    )
);

sagaMiddleware.run(Sagas)

export default Store;