import ACTION_TYPES from './actionTypes'
import GUser from "../interfaces/user.interface";
import {GRepo} from "../interfaces/repo.interface";
import {GCommit} from "../interfaces/commit.interface";

export const addUser = (user: GUser) => {
    return {
        type: ACTION_TYPES.ADD_USER,
        payload: user
    }
};
export const addRepos = (repos: Array<GRepo>) => {
    return {
        type: ACTION_TYPES.ADD_REPOS,
        payload: repos
    }
};
export const addCommits = (commits: Array<GCommit>) => {
    return {
        type: ACTION_TYPES.ADD_COMMITS,
        payload: commits
    }
};
