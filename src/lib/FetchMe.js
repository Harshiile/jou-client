import { AsyncFetcher } from "./Fetcher";

export const fetchMe = (setUser, accessToken, setAccessToken) => {
    AsyncFetcher({
        url: `/get/fetch-me`,
        cb: ({ data }) => {
            setUser(data.userData);
        },
    })
}