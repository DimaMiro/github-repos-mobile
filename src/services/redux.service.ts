import GUser from "../interfaces/user.interface";
import {GRepo} from "../interfaces/repo.interface";
import store from "../redux/store";
import ACTION_TYPES from "../redux/actionTypes";

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


const ReduxService = {
    addUserToStore,
    addReposToStore
}
export default ReduxService
