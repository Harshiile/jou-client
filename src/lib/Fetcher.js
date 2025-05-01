export const AsyncFetcher = ({ url, cb }) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}${url}`)
        .then(res => res.json())
        .then(({ status, message, data, errorMsg }) => {
            if (status == 200) cb()
            else console.log('Error : ', errorMsg);
        })
        .catch(err => console.error(err))
}