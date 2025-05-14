import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AsyncFetcher } from '../../lib/Fetcher'
import { useAccessToken } from '../../context/acsTkn'


const JoinWS = () => {
    const [accessToken, setAccessToken] = useAccessToken()
    const searchParams = useParams()
    useEffect(() => {
        AsyncFetcher({
            url: `/service/join/workspace/${searchParams.linkParams}`,
            cb: data => console.log(data),
            methodType: 'POST',
            bodyData: { userId: "sssssssssssss" },
            accessToken,
            setAccessToken
        })
    }, [])

    return (
        <div>JoinWS</div>
    )
}

export default JoinWS