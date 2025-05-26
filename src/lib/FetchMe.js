import { AsyncFetcher } from "./Fetcher";

export const fetchMe = (setUser) => {
    AsyncFetcher({
        url: `/get/user/refresh`,
        cb: ({ data }) => {
            setUser(data.userData);
        },
    })
}