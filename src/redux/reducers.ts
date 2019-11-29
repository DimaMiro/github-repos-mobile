import { combineReducers } from 'redux';
import ACTION_TYPES from './actionTypes';
import GUser from "../interfaces/user.interface";
import {GRepos} from "../interfaces/repo.interface";

const userReducer = (state: GUser, action) => {
    if (action.type === ACTION_TYPES.ADD_USER) {
        return action.payload
    } else {
        return null
    }
};

const repoReducer = (state: GRepos, action) => {
    return null
};

const reducers = combineReducers({
    userState: userReducer,
    repoState: repoReducer
})

export default reducers
