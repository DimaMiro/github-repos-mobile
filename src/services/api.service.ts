import {API_URL} from "../utils/api.config";
import GUser from "../interfaces/user.interface";
import {GRepos} from "../interfaces/repo.interface";

function get<T>(path: string) {
    return fetch(API_URL + path)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
}

function getUserProfileAsync(username: string){
    return get<GUser>('users/'+ username)
}

function getReposAsync(username: string){
    return get<GRepos>('users/' + username + '/repos')
}

const ApiService = {
    getUserProfileAsync,
    getReposAsync
}
export default ApiService
