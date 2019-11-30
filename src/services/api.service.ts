import {API_URL} from '../utils/api.config';

function get(path: string) {
    return fetch(API_URL + path)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
}

function getUserProfileAsync(username: string){
    return get('users/'+ username)
}

function getReposAsync(username: string){
    return get('users/' + username + '/repos')
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
