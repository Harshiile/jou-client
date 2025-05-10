import React, { useEffect, useState } from 'react'
import { AsyncFetcher } from '../../lib/Fetcher'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import { Button } from '../../components/ui/button'
import { Clock, Users, UploadCloud, XCircle, CheckCircle, MoreHorizontal, Video, Eye } from 'lucide-react'
import { Separator } from '../../components/ui/separator'
import { Link } from 'react-router-dom'
import { ChannelDrawer } from './components/ChannelDrawer'
import VideoCard from './components/VideoCard'

const Dashboard = () => {
    const [user, setUser] = useState({
        id: '298446e0-745d-4ff5-b34c-d44f45b9e7b5',
        role: 'youtuber'
    })
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [videos, setVideos] = useState(null)
    const [filterVideos, setFilterVideos] = useState(null)
    const [workSpaces, setWorkSpaces] = useState(data)
    const [video, setVideo] = useState({
        editor: "bdb6961b-926d-4f11-afbe-87d9fb689a2d",
        fileId: null,
        id: "c631343f-b087-45b0-96a7-f0f0af44c5a8",
        status: "reviewPending",
        thumbnail: "https://i.ytimg.com/vi/D4p6bucga74/hqdefault.jpg?s%E2%80%A6BACGAY4AUAB&rs=AOn4CLBFikt8mX14J7M-MnEcMvOkeOptpA",
        title: "DJ ANGEOS - AUREA COSMICA - VocalVersion - (SuperSlowed + Reverb)",
        uploadedAt: "2025-05-11T18:35:00.000Z",
        url: "https://www.youtube.com/watch?v=hGA-PnewwVc",
        videoType: "public",
        workspace: "279c57a2-9236-44fa-9356-1159d87c83d1",

        // Do join
        channel: {
            handle: "@harshiile",
            avatar: "https://i.ytimg.com/vi/D4p6bucga74/hqdefault.jpg?s%E2%80%A6BACGAY4AUAB&rs=AOn4CLBFikt8mX14J7M-MnEcMvOkeOptpA"
        },
        duration: "10:23",
        views: "240 K",
        date: "2 weeks ago"
    })
    useEffect(() => {
        AsyncFetcher({
            url: `/get/workspaces?userId=${user.id}&role=${user.role}`,
            cb: ({ data }) => { setWorkSpaces(data.workspaces); }
        })
    }, [])
    const getTypeBadgeStyle = (type) => {
        switch (type.toLowerCase()) {
            case "private":
                return "bg-red-500/20 text-red-500";
            case "unlisted":
                return "bg-gray-700/50 text-gray-300";
            case "public":
                return "bg-blue-500/20 text-blue-400";
            default:
                return "bg-gray-600 text-white";
        }
    }

    const getStatusBadgeStyle = (status) => {
        switch (status) {
            case "uploaded":
                return "bg-green-500/20 text-green-500"
            case "uploadPending":
                return "bg-amber-500/20 text-amber-500"
            case "reviewPending":
                return "bg-blue-500/20 text-blue-500"
            default:
                return "bg-gray-500/20 text-gray-400"
        }
    }

    const getStatusLabel = (status) => {
        switch (status) {
            case "uploadPending":
                return "Uploading Pending"
            case "reviewPending":
                return "Review Pending"
            case "uploaded":
                return "Uploaded"
            default:
                return status
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString(); // customize format as needed
    }

    return (
        <div className='flex flex-col gap-y-15 h-[90vh] mt-7'>
            <ChannelDrawer
                open={isDrawerOpen}
                onOpenChange={setIsDrawerOpen}
                videos={videos}
                filterVideos={filterVideos}
                setFilterVideos={setFilterVideos}
            />
            <div className='w-[85vw] flex flex-col item-start border border-secondary p-5 rounded-xl'>
                <p className='text-xl font-bold'>Recent Activity</p>
                <div className='mt-4 flex flex-col gap-y-3'>
                    {/* {
                    {/* videos?.map(video => { */}
                    <VideoCard
                        video={video}
                        userType={'editor'}
                        forUse={0}
                    />
                    <Separator className='bg-secondary' />
                    <VideoCard
                        video={video}
                        userType={'editor'}
                        forUse={0}
                    />
                    <VideoCard
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
                    {workSpaces.map(ws => (
                        <div
                            key={ws.id}
                            className="border border-secondary bg-primary py-4 px-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
                            onClick={e => {
                                AsyncFetcher({
                                    url: `/get/videos?workspace=${ws.id}`,
                                    cb: ({ data }) => { setVideos(data.metadata); setFilterVideos(data.metadata) }
                                })
                                setIsDrawerOpen(!isDrawerOpen)
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
                                    <p className="text-sm text-gray-400">{ws.userHandle}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default Dashboard



const data = [
    {
        "id": "279c57a2-9236-44fa-9356-1159d87c83d1",
        "name": "Zirco",
        "userHandle": "@Zzirco",
        "avatar": "https://robohash.org/Zirco"
    },
    {
        "id": "a17d3212-13a7-4b22-b087-2fbcab2325a9",
        "name": "Alice",
        "userHandle": "@Alice123",
        "avatar": "https://robohash.org/Alice123"
    },
    {
        "id": "4d621b9d-3dcb-4329-bf8e-3d2e3c5a4455",
        "name": "Bob",
        "userHandle": "@Bob456",
        "avatar": "https://robohash.org/Bob456"
    },
]