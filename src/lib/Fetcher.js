import { toast } from "sonner"

export const AsyncFetcher = ({ url, cb, methodType, bodyData }) => {
    const fetchOptions = methodType == 'POST' ?
        {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        } : {
            credentials: "include",
        }

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api${url}`, fetchOptions)
        .then(async res => {
            const returnRes = await res.json()
            if (!res.ok) throw new Error(returnRes.message)
            return returnRes
        })
        .then(cb)
        .catch(err => toast.error(err.toString().split('Error: ')[1]))
}