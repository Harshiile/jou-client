import React, { useEffect, useState } from 'react'
import { AsyncFetcher } from '../../lib/Fetcher'
import { useUser } from '../../context/user'
import { useAccessToken } from '../../context/acsTkn'
import { useWorkSpaces } from '../../context/workspaces'
import { useVideos } from '../../context/videos'
import { ChannelDrawer } from './components/ChannelDrawer'
import { convertViews } from './components/VideoCard'
import Loader from '../../components/loader'

const Dashboard = () => {
    const [user] = useUser()
    const [accessToken, setAccessToken] = useAccessToken()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [videos, setVideos] = useVideos()
    const [filterVideos, setFilterVideos] = useState()
    const [recentVideos, setRecentVideos] = useState(null)
    const [workSpaces, setWorkSpaces] = useWorkSpaces()
    const [channel, setChannel] = useState(null)

    useEffect(() => {
        if (user.id && !workSpaces) {
            AsyncFetcher({
                url: `/get/workspaces?userId=${user.id}&role=${user.userType}`,
                cb: ({ data }) => {
                    console.log(data.workspaces);
                    setWorkSpaces(data.workspaces);
                },
                accessToken,
                setAccessToken
            })
        }
    }, [user, workSpaces])

    const fetchVideos = (wsId) => {
        AsyncFetcher({
            url: `/get/videos?workspace=${wsId}`,
            cb: ({ data }) => {
                setVideos(data.metadata);
                setFilterVideos(data.metadata)
            },
        })
    }

    return (
        <div className='flex flex-col gap-y-15 h-[90vh] mt-7'>
            <ChannelDrawer
                open={isDrawerOpen}
                onOpenChange={setIsDrawerOpen}
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
                        {workSpaces.length <= 0 ?
                            <p className='text-white'>Ready to Join a Team? No Workspaces Joined Yet</p>
                            :
                            workSpaces?.map(ws => (
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
                            ))

                        }

                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard
