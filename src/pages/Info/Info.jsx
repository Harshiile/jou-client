import React, { useEffect } from 'react'
import { AsyncFetcher } from '../../lib/Fetcher'
import { useSearchParams } from 'react-router-dom'
import { Duration } from 'luxon'
import { useAccessToken } from '../../context/acsTkn'

const Info = () => {
    const [accessToken, setAccessToken] = useAccessToken()
    const { days, hours, minutes, seconds } = Duration.fromISO('PT3M20S')
    console.log({
        days, hours, minutes, seconds
    });
    const userId = 'a124a255-8880-4417-91b1-607e0dc8748e'
    const [searchParams] = useSearchParams()
    useEffect(() => {
        const code = searchParams.get('code');
        if (code) {
            AsyncFetcher({
                url: `/youtube/get/channel-info?code=${code}&userId=${userId}`,
                cb: res => console.log(res),
                accessToken,
                setAccessToken
            })
        }
    }, [])

}

export default Info
