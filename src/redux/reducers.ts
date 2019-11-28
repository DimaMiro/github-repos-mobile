import { combineReducers } from 'redux';
import ACTION_TYPES from '../res/actionTypes';

const userReducer = (state, action) => {
    return null
};

const repoReducer = (state, action) => {
    return null
};

const reducers = combineReducers({
    userState: userReducer,
    repoState: repoReducer
})

export default reducers
