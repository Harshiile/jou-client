import { toast } from "sonner"

export const AsyncFetcher = async ({ url, cb, methodType, bodyData, accessToken, setAccessToken }) => {
    console.log('While Fecting : ', accessToken);

    const fetchOptions = methodType == 'POST' ?
        {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(bodyData)
        } : {
            credentials: "include",
            headers: {
                'authorization': `Bearer ${accessToken}`
            },
        }

    return fetch(`${import.meta.env.VITE_BACKEND_URL}/api${url}`, fetchOptions)
        .then(async res => {

            const returnRes = await res.json()
            if (!res.ok) {
                console.log('!res.ok'); throw new Error(returnRes.message)
            }
            else return returnRes
        })
        .then(cb)
        .catch(err => { toast.error(err.toString().split('Error: ')[1]) })
}