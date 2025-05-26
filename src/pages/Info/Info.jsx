import React, { useEffect } from 'react'
import { AsyncFetcher } from '../../lib/Fetcher'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Duration } from 'luxon'

const Info = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    useEffect(() => {
        const code = searchParams.get('code');
        if (code) {
            AsyncFetcher({
                url: `/youtube/connect/channel?code=${code}`,
                cb: _ => navigate('/dashboard'),
            })
        }
    }, [])
    return (
        <>
            Wait for Authentication ...
        </>
    )
}

export default Info
