import GUser from "../interfaces/user.interface";
import {GRepos} from "../interfaces/repo.interface";
import store from "../redux/store";
import ACTION_TYPES from "../redux/actionTypes";

function addUserToStore(user: GUser) {
    store.dispatch({
        type: ACTION_TYPES.ADD_USER,
        payload: user
    })
}


const ReduxService = {
    addUserToStore
}
export default ReduxService
