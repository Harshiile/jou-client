import { AsyncFetcher } from "./Fetcher";

export const fetchMe = (setUser, setAccessToken) => {
    AsyncFetcher({
        url: '/get/fetch-me',
        cb: ({ data }) => { console.log(data); setUser(data.userData); setAccessToken(data.accessToken) }
    })
}