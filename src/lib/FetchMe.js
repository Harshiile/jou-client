import { AsyncFetcher } from "./Fetcher";

export const fetchMe = (setUser, accessToken, setAccessToken) => {
    AsyncFetcher({
        url: `/get/user/refresh`,
        cb: ({ data }) => {
            setUser(data.userData);
        },
    })
}