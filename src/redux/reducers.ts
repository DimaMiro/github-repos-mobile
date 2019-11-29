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

const reducers = combineReducers({
    userState: userReducer,
    repoState: repoReducer
})

export default reducers
