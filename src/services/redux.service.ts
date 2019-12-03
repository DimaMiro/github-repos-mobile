import GUser from "../interfaces/user.interface";
import {GRepo} from "../interfaces/repo.interface";
import store from "../redux/store";
import ACTION_TYPES from "../redux/actionTypes";
import {GCommit} from "../interfaces/commit.interface";

function addUserToStore(user: GUser) {
    store.dispatch({
        type: ACTION_TYPES.ADD_USER,
        payload: user
    })
}
function addReposToStore(repos: Array<GRepo>) {
    store.dispatch({
        type: ACTION_TYPES.ADD_REPOS,
        payload: repos
    })
}

function addCommitsToStore(commits: Array<GCommit>) {
    store.dispatch({
        type: ACTION_TYPES.ADD_COMMITS,
        payload: commits
    })
}


const ReduxService = {
    addUserToStore,
    addReposToStore,
    addCommitsToStore
}
export default ReduxService
