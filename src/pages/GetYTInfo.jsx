import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useChannels } from '../context/channels';

const GetYTInfo = () => {
    const navigate = useNavigate()
    const [channels, setChannels] = useChannels()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        console.log(code);
        fetch(`http://localhost:3000/api/get/youtube/info?code=${code}`)
            .then(res => res.json())
            .then(({ data }) => {
                if (data) {
                    setChannels(prev => [...prev, data])
                    navigate('/')
                }
            })
    }, [])
}

export default GetYTInfo