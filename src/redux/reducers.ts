import { combineReducers } from 'redux';
import ACTION_TYPES from './actionTypes';

const userReducer = (state = {}, action) => {
    if (action.type === ACTION_TYPES.ADD_USER) {
        return action.payload
    } else {
        return state
    }
};

const repoReducer = (state = [], action) => {
    if (action.type === ACTION_TYPES.ADD_REPOS) {
        return action.payload
    } else {
        return state
    }
};

const commitReducer = (state = [], action) => {
    if (action.type === ACTION_TYPES.ADD_COMMITS) {
        return action.payload
    } else {
        return state
    }
};

const reducers = combineReducers({
    userState: userReducer,
    repoState: repoReducer,
    commitState: commitReducer
})

export default reducers
