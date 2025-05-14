import React, { useEffect, useState } from 'react'
import { AsyncFetcher } from '../../lib/Fetcher'
import { useUser } from '../../context/user'
import { useAccessToken } from '../../context/acsTkn'
import { ChannelDrawer } from './components/ChannelDrawer'
import VideoCard, { convertViews } from './components/VideoCard'
import Loader from '../../components/loader'

const Dashboard = () => {
    const [user] = useUser()
    const [accessToken, setAccessToken] = useAccessToken()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [videos, setVideos] = useState(null)
    const [recentVideos, setRecentVideos] = useState(null)
    const [filterVideos, setFilterVideos] = useState(null)
    const [workSpaces, setWorkSpaces] = useState(null)
    const [channel, setChannel] = useState(null)

    useEffect(() => {
        if (user.id) {
            AsyncFetcher({
                url: `/get/workspaces?userId=${user.id}&role=${user.userType}`,
                cb: ({ data }) => {
                    setWorkSpaces(data.workspaces);
                },
                accessToken,
                setAccessToken
            })
        }
    }, [user, accessToken, setAccessToken])

    const fetchVideos = (wsId) => {
        AsyncFetcher({
            url: `/get/videos?workspace=${wsId}`,
            cb: ({ data }) => {
                setVideos(data.metadata);
                setFilterVideos(data.metadata);
            },
            accessToken,
            setAccessToken
        })
    }

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
            {/* Recent Activities Section */}
            <div className={`w-[85vw] mx-auto flex flex-col justify-center border-2 border-secondary p-5 rounded-xl transition-all duration-500 ${!recentVideos ? 'border-[max-content] w-max items-center' : 'items-start'}`}>
                <p className='text-xl font-bold mb-4'>Recent Activity</p>
                {!recentVideos ? (
                    <Loader />
                ) : (
                    <div className='mt-4 flex flex-col gap-y-3'>
                        {/* Add the video mapping code here */}
                    </div>
                )}
            </div>

            {/* Workspaces Section */}
            <div className={`w-[85vw] mx-auto flex flex-col justify-center border-2 border-secondary p-5 px-8 rounded-xl transition-all duration-500 ${!workSpaces ? 'border-[max-content] w-max items-center' : 'items-start '}`}>
                <p className='text-xl font-bold mb-4'>WorkSpaces</p>
                {!workSpaces ? (
                    <Loader />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {workSpaces?.map(ws => (
                            <div
                                key={ws.id}
                                className="border border-secondary bg-primary py-4 px-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
                                onClick={e => {
                                    setChannel(ws);
                                    fetchVideos(ws.id);
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
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard
