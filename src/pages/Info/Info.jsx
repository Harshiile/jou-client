import React, { useEffect } from 'react'
import { AsyncFetcher } from '../../lib/Fetcher'
import { useSearchParams } from 'react-router-dom'
import { Duration } from 'luxon'

const Info = () => {
    const { days, hours, minutes, seconds } = Duration.fromISO('PT3M20S')
    console.log({
        days, hours, minutes, seconds
    });
    const userId = '298446e0-745d-4ff5-b34c-d44f45b9e7b5'
    const [searchParams] = useSearchParams()
    useEffect(() => {
        const code = searchParams.get('code');
        if (code) {
            AsyncFetcher({
                url: `/youtube/get/channel-info?code=${code}&userId=${userId}`,
                cb: res => console.log(res)
            })
        }
    }, [])

}

export default Info