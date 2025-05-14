"use client"

import { Clock, Eye, Video, ArrowUpDown } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Drawer, DrawerContent, DrawerHeader } from "../../../components/ui/drawer"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu"
import { Separator } from '../../../components/ui/separator'
import { Link } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import { useAccessToken } from '../../../context/acsTkn'
import { Input } from '../../../components/ui/input'
import VideoCard, { convertViews } from './VideoCard'
import { useEffect, useState } from 'react'
import { AsyncFetcher } from '../../../lib/Fetcher'

const channel = {
    name: "Tech Explorer",
    handle: "@techexplorer",
    subscribers: "152K",
    avatar: "https://robohash.org/techexplorer",
}


export function ChannelDrawer({ open, onOpenChange, videos, filterVideos, setFilterVideos, channel }) {
    const [accessToken, setAccessToken] = useAccessToken()
    const [filterParams, setFilterParams] = useState({
        views: false,
        time: false,
        videoType: 'all',
        status: 'all'
    })
    const [isAscending, setIsAscending] = useState(true)
    useEffect(() => {
        // filterParams.status == 'all' ? setFilterVideos(videos) : setFilterVideos(videos.filter(video => video.status == filterParams.status))

        // filterParams.videoType == 'all' ? setFilterVideos(videos) : setFilterVideos(videos.filter(video => video.videoType == filterParams.videoType))

        // filterParams.views && setFilterVideos(videos.sort((a, b) => Number(a.views) - Number(b.views)))
    }, [filterParams])


    const toggleParams = (param) => {
        setFilterParams(prev => ({
            ...prev,
            [param]: !prev[param]
        }));
    }
    const setVideoType = (videoType) => {
        setFilterParams(prev => ({
            ...prev,
            videoType: videoType == prev.videoType ? 'all' : videoType
        }))
    }

    const setVideoStatus = (status) => {
        setFilterParams(prev => ({
            ...prev,
            status: status == prev.status ? 'all' : status
        }))
    }


    if (!channel) return null

    return (
        <Drawer open={open} onOpenChange={onOpenChange} direction="bottom" className='border-none'>
            <DrawerContent className="h-[80vh] w-screen border-none bg-primary">
                <DrawerHeader>
                    <div className='flex items-center justify-between border-b border-border/40 px-6 py-4 bg-primary'>
                        <div className="flex items-center gap-4 w-max">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={channel.avatar || "/placeholder.svg"} alt={channel.name} />
                                <AvatarFallback>{channel.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="text-xl font-bold">{channel.name}</h2>
                                <p className="text-sm text-muted-foreground">{channel.userHandle} • {convertViews(channel.subscribers.toString())} subscribers</p>
                            </div>
                        </div>
                        <div>
                            <Button
                                className='bg-white hover:cursor-pointer text-black hover:bg-white font-bold text-md w-max'
                                onClick={_ => AsyncFetcher({
                                    url: `/service/generate-link?ws=${channel.id}`,
                                    cb: ({ data }) => console.log(data?.link),
                                    accessToken,
                                    setAccessToken
                                })}
                            >Generate Link</Button>
                        </div>
                    </div>
                </DrawerHeader>
                <div className="overflow-auto p-6">
                    <div className='flex items-center justify-between mb-7'>
                        <h3 className="text-lg font-semibold ">Channel Videos</h3>
                        <div className='flex items-center gap-x-6'>
                            <Link to='/upload'>
                                <Button className='bg-white text-black font-bold cursor-pointer hover:bg-white'>New Upload</Button>
                            </Link>


                            <DropdownMenu>
                                <DropdownMenuTrigger className='bg-white text-black font-bold cursor-pointer hover:bg-white'>
                                    <Button className='bg-white text-black font-bold cursor-pointer hover:bg-white rounded-xl'>Filter</Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="text-[#e3e3e3] border-secondary shadow-lg -translate-x-30 translate-y-3 bg-primary flex flex-col gap-y-3 flex-wrap p-4">
                                    <DropdownMenuGroup className='flex justify-center gap-x-3'>
                                        <DropdownMenuItem
                                            onClick={() => toggleParams('time')}
                                            className={`border border-secondary ${filterParams.time ? 'bg-green-400 !hover:bg-green-400 text-black font-bold' : ''}`}
                                        >
                                            Time
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => toggleParams('views')}
                                            className={`border border-secondary ${filterParams.views ? 'bg-green-400 !hover:bg-green-400 text-black font-bold' : ''}`}
                                        >
                                            Views
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>

                                    <DropdownMenuGroup className='flex gap-x-3 justify-center'>
                                        <DropdownMenuItem
                                            onClick={() => setVideoType('public')}
                                            className={`border border-secondary ${filterParams.visibility === 'public' ? 'bg-green-400 hover:bg-green-400' : ''}`}
                                        >
                                            Public
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => setVideoType('private')}
                                            className={`border border-secondary ${filterParams.visibility === 'private' ? 'bg-green-400 hover:bg-green-400' : ''}`}
                                        >
                                            Private
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => setVideoType('unlisted')}
                                            className={`border border-secondary ${filterParams.visibility === 'unlisted' ? 'bg-green-400 hover:bg-green-400' : ''}`}
                                        >
                                            Unlisted
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>

                                    <DropdownMenuGroup className='flex justify-center gap-x-3'>
                                        <DropdownMenuItem
                                            onClick={() => setVideoStatus('reviewPending')}
                                            className={`border border-secondary ${filterParams.time ? 'bg-green-400 !hover:bg-green-400 text-black font-bold' : ''}`}
                                        >
                                            Review Pending
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => setVideoStatus('uploadPending')}
                                            className={`border border-secondary ${filterParams.views ? 'bg-green-400 !hover:bg-green-400 text-black font-bold' : ''}`}
                                        >
                                            Uploading Pending
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => setVideoStatus('uploaded')}
                                            className={`border border-secondary ${filterParams.views ? 'bg-green-400 !hover:bg-green-400 text-black font-bold' : ''}`}
                                        >
                                            Uploaded
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>

                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Input placeholder='Search' className='font-bold' />

                            <ArrowUpDown
                                onClick={_ => setIsAscending(prev => !prev)}
                                className={`w-15 h-8 cursor-pointer transition-all ${isAscending && 'bg-white text-black rounded-[5px] px-2'}`}
                            />
                        </div>
                    </div>
                    <div className="space-y-4">
                        {
                            filterVideos != null ?
                                <>
                                    {filterVideos.length > 0 ?
                                        filterVideos.map((video) => (
                                            <>
                                                <VideoCard video={video} />
                                                <Separator className='bg-secondary' />
                                            </>
                                        ))
                                        :
                                        <p>Workspace not contain any video</p>
                                    }

                                </>
                                :
                                <div className="gap-4 w-full flex items-center justify-center absolute top-1/2">
                                    <div
                                        className="w-15 h-15 border-4 border-transparent text-4xl animate-spin flex items-center justify-center border-t-white/20 rounded-full"
                                    >
                                        <div
                                            className="w-11 h-11 border-4 border-transparent text-2xl animate-spin flex items-center justify-center border-t-secondary rounded-full"
                                        >
                                        </div>
                                    </div>
                                </div>

                        }
                    </div>
                </div>
            </DrawerContent>
        </Drawer >
    )
}
