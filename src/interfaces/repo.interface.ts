export interface GRepo {
    id: number,
    name: string,
    description: string,
    language: string,
    stargazers_count: number
}
export interface GRepos {
    repos: Array<GRepo>,
}
