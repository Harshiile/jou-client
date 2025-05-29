import React, { useEffect } from 'react'
import { AsyncFetcher } from '../../lib/Fetcher'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Loader from '../../components/loader'

const index = () => {
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
            <Loader />
            <p className='mt-16'>Wait for Authentication</p>
        </>
    )
}

export default index
