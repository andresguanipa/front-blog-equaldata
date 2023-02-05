import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../reducers/authReducer';

const reducer = combineReducers({
    auth: authReducer
});

export const store = configureStore({
    reducer
});
