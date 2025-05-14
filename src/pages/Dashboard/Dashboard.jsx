import React, { useEffect, useState } from 'react'
import { AsyncFetcher } from '../../lib/Fetcher'
import { useUser } from '../../context/user'
import { useAccessToken } from '../../context/acsTkn'
import { ChannelDrawer } from './components/ChannelDrawer'
import VideoCard, { convertViews } from './components/VideoCard'


const Dashboard = () => {
    const [user] = useUser()
    const [accessToken, setAccessToken] = useAccessToken()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [videos, setVideos] = useState(null)
    const [filterVideos, setFilterVideos] = useState(null)
    const [workSpaces, setWorkSpaces] = useState(null)
    const [channel, setChannel] = useState(null)

    useEffect(() => {
        if (user.id) AsyncFetcher({
            url: `/get/workspaces?userId=${user.id}&role=${user.userType}`,
            cb: ({ data }) => { console.log(data.workspaces); setWorkSpaces(data.workspaces); },
            accessToken,
            setAccessToken
        })
    }, [user])


    return (
        <div className='flex flex-col gap-y-15 h-[90vh] mt-7'>
            <ChannelDrawer
                open={isDrawerOpen}
                onOpenChange={setIsDrawerOpen}
                videos={videos}
                filterVideos={filterVideos}
                setFilterVideos={setFilterVideos}
                channel={channel}
            />
            <div className='w-[85vw] flex flex-col item-start border border-secondary p-5 rounded-xl'>
                <p className='text-xl font-bold'>Recent Activity</p>
                <div className='mt-4 flex flex-col gap-y-3'>
                    {/* {
                    {/* videos?.map(video => { */}
                    {/* <VideoCard
                        video={video}
                        userType={'editor'}
                        forUse={0}
                    />
                    {/* }) */}
                    {/* } */}
                </div >
            </div >
            <div className='w-[85vw] flex flex-col item-start justify-start border border-secondary p-5 rounded-xl'>
                <p className='text-xl font-bold mb-4'>WorkSpaces</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {
                        workSpaces ?
                            workSpaces.map(ws => (
                                <div
                                    key={ws.id}
                                    className="border border-secondary bg-primary py-4 px-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
                                    onClick={e => {
                                        setChannel(ws);
                                        AsyncFetcher({
                                            url: `/get/videos?workspace=${ws.id}`,
                                            cb: ({ data }) => {
                                                setVideos(data.metadata);
                                                setFilterVideos(data.metadata);
                                            },
                                            accessToken,
                                            setAccessToken
                                        });
                                        setIsDrawerOpen(!isDrawerOpen);
                                    }}
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={ws.avatar}
                                            alt={ws.name}
                                            className="w-12 h-12 rounded-full object-cover ring-2 ring-secondary"
                                        />
                                        <div className="flex flex-col">
                                            <p className="font-semibold text-lg text-white">{ws.name}</p>
                                            <p className='text-sm text-gray-400'>{ws.userHandle} • {convertViews(ws.subscribers?.toString())} Subscribers</p>
                                        </div>
                                    </div>
                                </div>

                            ))
                            :
                            <p>Loading</p>
                    }

                </div>
            </div>
        </div >
    )
}

export default Dashboard