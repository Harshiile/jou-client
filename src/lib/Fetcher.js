import { toast } from "sonner"


export const AsyncFetcher = async ({ url, cb, methodType = 'GET', bodyData }) => {
    try {
        const fetchOptions = methodType === 'POST'
            ? {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyData)
            }
            : { credentials: 'include' };

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}${url}`, fetchOptions);

        if (res.status === 999) {
            // Token expired — Renew the token
            const renewed = await AsyncFetcher({
                url: '/service/renew',
                cb: _ => { },
            });

            if (renewed) {
                // Original Request
                return AsyncFetcher({ url, cb, methodType, bodyData });
            } else {
                throw new Error('Please Login Again');
            }
        }

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Unknown error');

        cb?.(data); // call your callback if provided
        return data;
    } catch (err) {
        toast.error(err.message || 'Something went wrong');
    }
};























// -----------------------------------------------------------------------------------------------------------------OLD ONE
// export const AsyncFetcher = async ({ url, cb, methodType, bodyData }) => {
//     const fetchOptions = methodType == 'POST' ?
//         {
//             method: 'POST',
//             credentials: "include",
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(bodyData)
//         }
//         :
//         {
//             credentials: "include"
//         }
//     return fetch(`${import.meta.env.VITE_BACKEND_URL}/api${url}`, fetchOptions)
//         .then(async res => {
//             if (res.status === 999) {
//                 // Access Token Renew Needed
//                 return AsyncFetcher({
//                     url: '/service/renew',
//                     cb: _ => { }
//                 })
//                     .then(_ => AsyncFetcher({
//                         url,
//                         cb,
//                         methodType,
//                         bodyData
//                     }))
//                     .catch(err => { throw new Error("Error 1") })
//             }
//             const data = await res.json()
//             if (!res.ok) throw new Error(data.message)
//             return data
//         })
//         .then(cb)
//         .catch(err => { console.log(err.message); toast.error(err.message) })
// }