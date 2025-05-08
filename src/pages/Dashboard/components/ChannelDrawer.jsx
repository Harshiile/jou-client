"use client"

import { Clock, Eye, Video } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer"
import { Separator } from '../../../components/ui/separator'
import { Link } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import VideoCard, { getTypeBadgeStyle } from './VideoCard'

const channel = {
    name: "Tech Explorer",
    handle: "@techexplorer",
    subscribers: "152K",
    avatar: "https://robohash.org/techexplorer",
    videos: [
        {
            id: "vid1",
            title: "Top 10 Programming Languages in 2025",
            thumbnail: "https://i.ytimg.com/vi/D4p6bucga74/hqdefault.jpg?s%E2%80%A6BACGAY4AUAB&rs=AOn4CLBFikt8mX14J7M-MnEcMvOkeOptpA",
            views: "120K",
            date: "2 weeks ago",
            status: "uploaded",
            videoType: "public"
        },
        {
            id: "vid2",
            title: "Building a Web App with React and .NET Core",
            thumbnail: "https://i.ytimg.com/vi/D4p6bucga74/hqdefault.jpg?s%E2%80%A6BACGAY4AUAB&rs=AOn4CLBFikt8mX14J7M-MnEcMvOkeOptpA",
            views: "45K",
            date: "1 month ago",
            status: "uploaded",
            videoType: "private"
        },
        {
            id: "vid3",
            title: "Dockerizing a PostgreSQL Database",
            thumbnail: "https://i.ytimg.com/vi/D4p6bucga74/hqdefault.jpg?s%E2%80%A6BACGAY4AUAB&rs=AOn4CLBFikt8mX14J7M-MnEcMvOkeOptpA",
            views: "32K",
            date: "3 weeks ago",
            status: "reviewPending",
            videoType: "unlisted"
        },
        {
            id: "vid4",
            title: "Introduction to Smart Contracts with Solidity",
            thumbnail: "https://i.ytimg.com/vi/D4p6bucga74/hqdefault.jpg?s%E2%80%A6BACGAY4AUAB&rs=AOn4CLBFikt8mX14J7M-MnEcMvOkeOptpA",
            views: "67K",
            date: "2 months ago",
            status: "uploadPending",
            videoType: "public"
        },
        {
            id: "vid5",
            title: "How to Build a Cross-Chain Bridge (Web3 Guide)",
            thumbnail: "https://i.ytimg.com/vi/D4p6bucga74/hqdefault.jpg?s%E2%80%A6BACGAY4AUAB&rs=AOn4CLBFikt8mX14J7M-MnEcMvOkeOptpA",
            views: "21K",
            date: "1 week ago",
            status: "reviewPending",
            videoType: "unlisted"
        }
    ]
}


export function ChannelDrawer({ open, onOpenChange }) {
    if (!channel) return null

    return (
        <Drawer open={open} onOpenChange={onOpenChange} direction="bottom" className='border-none'>
            <DrawerContent className="h-[80vh] w-screen border-none bg-primary">
                <DrawerHeader className="border-b border-border/40 px-6 py-4 bg-primary">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={channel.avatar || "/placeholder.svg"} alt={channel.name} />
                            <AvatarFallback>{channel.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-xl font-bold">{channel.name}</h2>
                            <p className="text-sm text-muted-foreground">{channel.handle} • {channel.subscribers} subscribers</p>
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

                            {/* <Select onValueChange={setVideoType}> */}
                            <Select>
                                <SelectTrigger className='w-full border border-secondary'>
                                    <SelectValue placeholder='All' className='text-white' />
                                </SelectTrigger>
                                <SelectContent className='bg-primary text-[#e3e3e3]'>
                                    <SelectItem value='0' className={getTypeBadgeStyle('public')}>Public</SelectItem>
                                    <SelectItem value='1' className={getTypeBadgeStyle('private')}>Private</SelectItem>
                                    <SelectItem value='2' className={getTypeBadgeStyle('unlisted')}>Unlisted</SelectItem>
                                </SelectContent>
                            </Select>

                            <Input placeholder='Search' className='font-bold' />
                        </div>
                    </div>
                    <div className="space-y-4">
                        {channel.videos.map((video) => (
                            <>
                                <VideoCard video={video} />
                                <Separator className='bg-secondary' />
                            </>
                        ))}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
