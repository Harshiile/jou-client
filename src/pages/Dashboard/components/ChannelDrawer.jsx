"use client"

import { Clock, Eye, ArrowUpDown } from 'lucide-react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "../../../components/ui/avatar";
import {
    Drawer,
    DrawerContent,
    DrawerHeader
} from "../../../components/ui/drawer";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "../../../components/ui/dropdown-menu";
import { Separator } from '../../../components/ui/separator';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { useVideos } from '../../../context/videos';
import { useUser } from '../../../context/user';
import { Input } from '../../../components/ui/input';
import Loader from '../../../components/loader';
import VideoCard, { convertViews } from './VideoCard';
import { useEffect, useState } from 'react';
import { AsyncFetcher } from '../../../lib/Fetcher';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export const ChannelDrawer = ({ open, onOpenChange, filterVideos, setFilterVideos, channel }) => {
    const [videos, setVideos] = useVideos();
    const [user] = useUser();
    const [filterParams, setFilterParams] = useState({
        views: false,
        time: false,
        videoType: null,
        status: null
    });
    const [isAscending, setIsAscending] = useState(true);

    useEffect(() => {
        setFilterVideos(videos);
    }, []);

    const toggleParams = (param) => {
        setFilterParams(prev => ({
            ...prev,
            [param]: !prev[param]
        }));
    };

    const setVideoType = (videoType) => {
        setFilterParams(prev => ({
            ...prev,
            videoType: videoType === prev.videoType ? null : videoType
        }));
    };

    const setVideoStatus = (status) => {
        setFilterParams(prev => ({
            ...prev,
            status: status === prev.status ? null : status
        }));
    };

    if (!channel) return null;

    return (
        <AnimatePresence>
            {open && (
                <Drawer open={open} onOpenChange={onOpenChange} direction="bottom">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <DrawerContent className="h-[80vh] w-screen border-none bg-primary text-white">
                            <DrawerHeader>
                                <div className="flex items-center justify-between border-b border-border/40 px-6 py-4 bg-primary">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={channel.avatar || "/placeholder.svg"} alt={channel.name} />
                                            <AvatarFallback>{channel.name.substring(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h2 className="text-xl font-bold">{channel.name}</h2>
                                            <p className="text-sm text-muted-foreground">
                                                {channel.userHandle} • {convertViews(channel.subscribers.toString())} subscribers
                                            </p>
                                        </div>
                                    </div>
                                    {user.userType === 'youtuber' && (
                                        <motion.div whilehover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Button
                                                className="bg-white text-black font-bold"
                                                onClick={() =>
                                                    AsyncFetcher({
                                                        url: `/generate-link/workspace/join?ws=${channel.id}`,
                                                        cb: ({ data }) => {
                                                            navigator.clipboard.writeText(data?.link);
                                                            toast.success('Link Copied')
                                                        }
                                                    })
                                                }
                                            >
                                                Generate Link
                                            </Button>
                                        </motion.div>
                                    )}
                                </div>
                            </DrawerHeader>

                            <div className="overflow-auto p-6">
                                <div className="flex items-center justify-between mb-7">
                                    <h3 className="text-lg font-semibold">Channel Videos</h3>
                                    <div className="flex items-center gap-x-4">
                                        {user.userType === 'editor' && (
                                            <motion.div whilehover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                <Link to="/upload">
                                                    <Button className="bg-white text-black font-bold">New Upload</Button>
                                                </Link>
                                            </motion.div>
                                        )}

                                        {/* FILTER */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <motion.div whilehover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                                    <Button className="bg-white text-black font-bold rounded-xl">Filter</Button>
                                                </motion.div>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="text-[#e3e3e3] border-secondary shadow-lg translate-y-3 bg-primary flex flex-col gap-y-4 p-6 rounded-lg">
                                                <DropdownMenuGroup className="flex gap-x-3 justify-center">
                                                    {['time', 'views'].map((param) => (
                                                        <motion.div key={param} whilehover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                            <DropdownMenuItem
                                                                onClick={() => toggleParams(param)}
                                                                className={`border border-secondary ${filterParams[param] ? 'bg-green-400 text-black font-bold' : ''}`}
                                                            >
                                                                {param.charAt(0).toUpperCase() + param.slice(1)}
                                                            </DropdownMenuItem>
                                                        </motion.div>
                                                    ))}
                                                </DropdownMenuGroup>

                                                <DropdownMenuGroup className="flex gap-x-3 justify-center">
                                                    {['public', 'private', 'unlisted'].map((type) => (
                                                        <motion.div key={type} whilehover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                            <DropdownMenuItem
                                                                onClick={() => setVideoType(type)}
                                                                className={`border border-secondary ${filterParams.videoType === type ? 'bg-green-400 text-black font-bold' : ''}`}
                                                            >
                                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                                            </DropdownMenuItem>
                                                        </motion.div>
                                                    ))}
                                                </DropdownMenuGroup>

                                                <DropdownMenuGroup className="flex gap-x-3 justify-center">
                                                    {['reviewPending', 'uploadPending', 'uploaded'].map((status) => (
                                                        <motion.div key={status} whilehover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                            <DropdownMenuItem
                                                                onClick={() => setVideoStatus(status)}
                                                                className={`border border-secondary ${filterParams.status === status ? 'bg-green-400 text-black font-bold' : ''}`}
                                                            >
                                                                {status.replace(/([A-Z])/g, ' $1').trim()}
                                                            </DropdownMenuItem>
                                                        </motion.div>
                                                    ))}
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        <Input placeholder="Search" className="font-bold" />
                                        <ArrowUpDown
                                            onClick={() => setIsAscending(prev => !prev)}
                                            className={`w-8 h-8 cursor-pointer transition-all ${isAscending && 'bg-white text-black rounded px-2'}`}
                                        />
                                    </div>
                                </div>

                                {/* VIDEO LIST */}
                                <div className="space-y-4">
                                    {filterVideos != null ? (
                                        filterVideos.length > 0 ? (
                                            <AnimatePresence>
                                                {/* {filterVideos.map((video) => (
                                                    <motion.div
                                                        key={video.id}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <VideoCard video={video} userType={user.userType} channel={channel} forUse={1} />
                                                        <Separator className="bg-secondary" />
                                                    </motion.div>
                                                ))} */}
                                            </AnimatePresence>
                                        ) : (
                                            <p>Workspace does not contain any videos</p>
                                        )
                                    ) : (
                                        <Loader className="absolute top-1/2 left-1/2" />
                                    )}
                                </div>
                            </div>
                        </DrawerContent>
                    </motion.div>
                </Drawer>
            )}
        </AnimatePresence>
    );
};
