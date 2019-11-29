import ACTION_TYPES from './actionTypes'
import GUser from "../interfaces/user.interface";
import {GRepo} from "../interfaces/repo.interface";

export const addUser = (user: GUser) => {
    return {
        type: ACTION_TYPES.ADD_USER,
        payload: user
    }
};
export const updateUser = (user: GUser) => {
    return {
        type: ACTION_TYPES.UPDATE_USER,
        payload: user
    }
};
export const addRepos = (repos: Array<GRepo>) => {
    return {
        type: ACTION_TYPES.ADD_REPOS,
        payload: repos
    }
};
export const updateRepos = (repos: Array<GRepo>) => {
    return {
        type: ACTION_TYPES.UPDATE_REPOS,
        payload: repos
    }
};
