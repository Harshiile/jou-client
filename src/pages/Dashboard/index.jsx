import { Separator } from '../../components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';

import { useEffect, useState } from 'react';
import { AsyncFetcher } from '../../lib/Fetcher';
import { useUser } from '../../context/user';
import { useWorkSpaces } from '../../context/workspaces';
import { useVideos } from '../../context/videos';
import Calender from './components/Schedule/Calender';
import Loader from '../../components/loader';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import invalid from '/invalid.jpg'
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

import { ChannelDrawer, VideoCard, WorkspaceSlider } from './components';


const PendingVideos = ({ videos, isReviewVideos, user, channel }) => {
    return (
        videos?.length > 0 ?
            videos?.map(video => (
                <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    <VideoCard
                        video={video}
                        userType={user.userType}
                        forUse={0}
                        channel={channel}
                    />
                    <Separator className="bg-secondary" />
                </motion.div>
            ))
            :
            <motion.div
                className="text-muted-foreground text-center col-span-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                No {isReviewVideos ? 'Review' : 'Upload'} Pending Videos
            </motion.div>
    )
}


const index = () => {
    const [user] = useUser();
    const navigate = useNavigate()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [videos, setVideos] = useVideos();
    const [filterVideos, setFilterVideos] = useState();
    const [pendingVideos, setPendingVideos] = useState({
        review: null,
        upload: null
    });
    const [workSpaces, setWorkSpaces] = useWorkSpaces();
    const [channel, setChannel] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [hoveredWorkspace, setHoveredWorkspace] = useState(null);
    const [isReviewVideos, setisReviewVideos] = useState(null)

    useEffect(() => {
        AsyncFetcher({
            url: '/get/user/workspaces',
            cb: ({ data }) => {
                setWorkSpaces(new Map(Object.entries(data.workspaces)))
            },
        });
        AsyncFetcher({
            url: '/get/user/videos',
            cb: ({ data }) => {
                const reviewPendingVideos = []
                const uploadPendingVideos = []
                data.videos.filter(v => {
                    if (v.status == 'reviewPending') reviewPendingVideos.push(v);
                    else if (v.status == 'uploadPending') uploadPendingVideos.push(v);
                })
                setPendingVideos({
                    review: reviewPendingVideos,
                    upload: uploadPendingVideos
                });
                setisReviewVideos(true);
            },
        });
    }, [])

    return (
        <>
            {hoveredWorkspace && <WorkspaceSlider workspace={hoveredWorkspace} />}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className='bg-primary border-none py-10'>
                    <DialogHeader className='mx-auto mb-3'>
                        <DialogTitle>Connect Youtube Account</DialogTitle>
                    </DialogHeader>
                    <Button
                        className='border border-secondary text-md bg-red-600 font-semibold hover:bg-red-600 py-5 w-3/4 mx-auto'
                        onClick={() => AsyncFetcher({
                            url: '/youtube/connecter-link',
                            cb: ({ data }) => { window.location.href = data.url }
                        })
                        }
                    >
                        Connect
                    </Button>
                </DialogContent>
            </Dialog >

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center w-full h-full px-8 gap-y-6 my-7"
            >
                <ChannelDrawer
                    open={isDrawerOpen}
                    onOpenChange={setIsDrawerOpen}
                    filterVideos={filterVideos}
                    setFilterVideos={setFilterVideos}
                    videos={videos}
                    channel={channel}
                />

                {/* Top Panels */}
                <div className="w-full h-[30vh] flex gap-x-6">
                    {/* WorkSpaces Panel */}
                    <motion.div
                        className="relative group w-[50%] border-2 border-secondary rounded-md p-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {
                            user.userType == 'youtuber' &&
                            <motion.button
                                className="absolute top-2 right-2 bg-white text-primary p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Add New WorkSpace"
                                whilegover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={_ => setIsDialogOpen(true)}
                            >
                                <Plus size={16} />
                            </motion.button>
                        }
                        <p className="text-lg font-semibold mb-3">Workspaces</p>


                        <div className="flex flex-wrap gap-4 h-full">
                            {
                                !workSpaces ?
                                    <Loader />
                                    :
                                    Array.from(workSpaces).length > 0 ?
                                        (
                                            Array.from(workSpaces)?.map((workspace, idx) => {
                                                const ws = workspace[1]
                                                return <motion.div
                                                    key={idx}
                                                    whilehover={{ scale: 1.05 }}
                                                    transition={{ type: 'spring', stiffness: 180 }}
                                                    className={`relative w-24 h-24 rounded-full overflow-hidden border-4 border-secondary ${ws.disconnected ? 'cursor-pointer' : 'cursor-pointer'}`}
                                                    onClick={() => {
                                                        if (ws.disconnected) {
                                                            toast.error(
                                                                <div className="flex items-center justify-between gap-4">
                                                                    <span>Workspace is Inactive</span>
                                                                    <Button
                                                                        className="px-3 py-1 h-auto bg-white text-black font-semibold hover:bg-white hover:text-black hover:font-semibold hover:cursor-pointer"
                                                                        onClick={() => {
                                                                            AsyncFetcher({
                                                                                url: `/youtube/re-connect?id=${ws.id}`,
                                                                                cb: ({ data }) => window.location.href = data.url
                                                                            })
                                                                        }}
                                                                    >
                                                                        Reconnect
                                                                    </Button>
                                                                </div>
                                                            );
                                                            return;
                                                        }
                                                        setIsDrawerOpen(!isDrawerOpen);
                                                        setChannel(ws);
                                                        AsyncFetcher({
                                                            url: `/get/user/workspace/videos?workspace=${ws.id}`,
                                                            cb: ({ data }) => {
                                                                setVideos(data.metadata);
                                                                setFilterVideos(data.metadata);
                                                            },
                                                        });
                                                    }}
                                                    onMouseEnter={() => !ws.disconnected && setHoveredWorkspace(ws)}
                                                    onMouseLeave={() => setHoveredWorkspace(null)}
                                                >
                                                    <img
                                                        src={ws.disconnected ? invalid : ws.avatar}
                                                        alt={ws.name}
                                                        className={`w-full h-full object-cover`}
                                                    />
                                                </motion.div>
                                            })
                                        )
                                        :
                                        <motion.div
                                            className="text-muted-foreground text-center col-span-full"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            No Workspace
                                        </motion.div>
                            }
                        </div>
                    </motion.div>

                    {/* Calendar Panel */}
                    <motion.div
                        className="w-[50%] border-2 border-secondary rounded-md p-4 text-xl"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="text-lg font-semibold mb-2">Schedule</p>
                        <Calender videos={tmpVideos} />
                    </motion.div>
                </div >

                {/* Pending Videos */}
                <motion.div
                    className="w-full h-[63vh] border-2 border-secondary rounded-md p-4 relative"
                    initial={{ opacity: 0, y: 20 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className='flex items-start gap-x-5'>
                        <p className="text-lg font-semibold mb-3">Pending Videos</p>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        className='bg-white text-black font-bold hover:bg-white hover:text-black hover:ont-bold hover:cursor-pointer'
                                        onClick={_ => setisReviewVideos(!isReviewVideos)}
                                    >{isReviewVideos ? 'Review Pending' : 'Upload Pending'}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Switch to {!isReviewVideos ? 'Review' : 'Upload'} Pending Videos</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                    </div>
                    <div className="w-full h-[95%] overflow-y-auto custom-scroll">
                        <AnimatePresence>
                            {
                                isReviewVideos == null ?
                                    <Loader />
                                    :
                                    <PendingVideos
                                        user={user}
                                        channel={channel}
                                        isReviewVideos={isReviewVideos}
                                        videos={isReviewVideos ? pendingVideos.review : pendingVideos.upload}
                                    />
                            }
                        </AnimatePresence>
                    </div>
                </motion.div >
            </motion.div >


        </>
    );
};

export default index;




const tmpVideos = [
    {
        thumbnail: "https://i.ytimg.com/vi/TEBrs2QBgu0/maxresdefault.jpg",
        status: "uploadPending",
        uploadAt: "2025-06-01T10:00:00Z",
        title: "Exploring the Hidden Gems of Bali",
        videoType: "Public",
        desc: "Embark on a journey through Bali's lesser-known treasures, from serene waterfalls to exquisite villas, offering a unique perspective of the island beyond its popular beaches."
    },
    {
        thumbnail: "https://i.ytimg.com/vi/SqcY0GlETPk/maxresdefault.jpg",
        status: "uploadPending",
        uploadAt: "2025-06-02T12:30:00Z",
        title: "React Tutorial for Beginners",
        videoType: "Public",
        desc: "A comprehensive guide for newcomers to React, this tutorial covers the fundamentals of building components and managing state, laying the groundwork for developing dynamic web applications."
    },
    {
        thumbnail: "https://i.ytimg.com/vi/drJNofd3gtk/maxresdefault.jpg",
        status: "uploadPending",
        uploadAt: "2025-06-03T14:00:00Z",
        title: "The iPhone 15 Pro Max is Unbeatable (Long Term Review)",
        videoType: "Unlisted",
        desc: "An in-depth analysis of the iPhone 15 Pro Max after extended use, highlighting its performance, camera capabilities, and overall user experience, providing insights into its long-term value."
    },
    {
        thumbnail: "https://i.ytimg.com/vi/GMp7m7_EYg8/maxresdefault.jpg",
        status: "uploadPending",
        uploadAt: "2025-06-04T16:15:00Z",
        title: "Funny Moments on MasterChef #2",
        videoType: "Private",
        desc: "A compilation of the most hilarious and unexpected moments from MasterChef, showcasing the lighter side of the intense culinary competition."
    }
];