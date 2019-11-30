import {API_URL} from "../utils/api.config";
import GUser from "../interfaces/user.interface";
import {GRepo} from "../interfaces/repo.interface";

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
    return get<Array<GRepo>>('users/' + username + '/repos')
}

function getCommitListAsync(username: string, repoName: string){
    return get('repos/'+ username + '/'+ repoName + '/commits')
}

const ApiService = {
    getUserProfileAsync,
    getReposAsync,
    getCommitListAsync
}
export default ApiService
