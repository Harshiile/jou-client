import React, { useEffect, useState } from 'react';
import { AsyncFetcher } from '../../lib/Fetcher';
import { useUser } from '../../context/user';
import { useAccessToken } from '../../context/acsTkn';
import { useWorkSpaces } from '../../context/workspaces';
import { useVideos } from '../../context/videos';
import Calender from './components/Schedule/Calender';
import { ChannelDrawer } from './components/ChannelDrawer';
import VideoCard, { convertViews } from './components/VideoCard';
import Loader from '../../components/loader';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import WorkspaceSlider from './components/WorkspaceSlider';
import { Separator } from '../../components/ui/separator';

const Dashboard = () => {
    const [user] = useUser();
    const [accessToken, setAccessToken] = useAccessToken();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [videos, setVideos] = useVideos();
    const [filterVideos, setFilterVideos] = useState();
    const [recentVideos, setRecentVideos] = useState(null);
    const [workSpaces, setWorkSpaces] = useWorkSpaces();
    const [channel, setChannel] = useState(null);
    const [hoveredWorkspace, setHoveredWorkspace] = useState(null);

    useEffect(() => {
        if (user.id && !workSpaces) {
            AsyncFetcher({
                url: `/get/workspaces?userId=${user.id}&role=${user.userType}`,
                cb: ({ data }) => {
                    setWorkSpaces(data.workspaces);
                },
                accessToken,
                setAccessToken,
            });
        }
    }, [user, workSpaces]);

    const fetchVideos = (wsId) => {
        AsyncFetcher({
            url: `/get/videos?workspace=${wsId}`,
            cb: ({ data }) => {
                setVideos(data.metadata);
                setFilterVideos(data.metadata);
            },
        });
    };

    return (
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
                    <motion.button
                        className="absolute top-2 right-2 bg-white text-primary p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Add New WorkSpace"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Plus size={16} />
                    </motion.button>
                    <p className="text-lg font-semibold mb-3">Workspaces</p>

                    <div className="relative flex flex-wrap items-center gap-4">
                        {workspaces.map((ws, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 180 }}
                                className="relative w-24 h-24 rounded-full border-4 border-secondary overflow-hidden cursor-pointer"
                                onMouseEnter={() => setHoveredWorkspace(ws)}
                                onMouseLeave={() => setHoveredWorkspace(null)}
                            >
                                <img
                                    src={ws.avatar}
                                    alt={ws.name}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        ))}

                        <AnimatePresence>
                            {hoveredWorkspace && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <WorkspaceSlider workspace={hoveredWorkspace} />
                                </motion.div>
                            )}
                        </AnimatePresence>
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
            </div>

            {/* Pending Videos */}
            <motion.div
                className="w-full h-[63vh] border-2 border-secondary rounded-md p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <p className="text-lg font-semibold mb-3">Pending Videos</p>
                <div className="w-full h-[95%] overflow-y-auto custom-scroll">
                    <AnimatePresence>
                        {tmpPendingVideos?.length > 0 ? (
                            tmpPendingVideos.map((video) => (
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
                        ) : (
                            <motion.div
                                className="text-muted-foreground text-center col-span-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                No pending videos
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Dashboard;




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


const workspaces = [
    {
        name: "CodeCraft Studio",
        avatar: "https://i.pravatar.cc/150?img=10",
        description: "A community of developers crafting elegant and scalable code.",
        userHandle: "codecraft",
        totalVideos: 48,
        tags: ["development", "javascript", "opensource"],
        createdAt: "2023-05-17T10:00:00Z"
    },
    {
        name: "FoodieVerse",
        avatar: "https://i.pravatar.cc/150?img=65",
        description: "Exploring global cuisines and sharing delicious recipes.",
        userHandle: "foodieverse",
        totalVideos: 62,
        tags: ["cooking", "vlogs", "recipes"],
        createdAt: "2022-11-02T15:45:00Z"
    },
    {
        name: "MindBloom Academy",
        avatar: "https://i.pravatar.cc/150?img=32",
        description: "Helping students grow with simplified educational content.",
        userHandle: "mindbloom",
        totalVideos: 105,
        tags: ["education", "math", "science", "exams"],
        createdAt: "2021-08-10T09:30:00Z"
    }
];


const tmpPendingVideos = [
    {
        id: '1',
        title: 'Mastering React in 2025',
        duration: 1120,
        uploadAt: '2025-05-20T14:30:00Z',
        thumbnail: 'https://i.ytimg.com/vi/TEBrs2QBgu0/maxresdefault.jpg',
        videoType: 'public',
        status: 'reviewPending',
        editor: 'Alice Johnson'
    },
    {
        id: '2',
        title: 'Top 10 VS Code Extensions for Web Devs',
        duration: 620,
        uploadAt: '2025-05-21T10:00:00Z',
        thumbnail: 'https://i.ytimg.com/vi/TEBrs2QBgu0/maxresdefault.jpg',
        videoType: 'unlisted',
        status: 'reviewPending',
        editor: 'Bob Martin'
    },
    {
        id: '3',
        title: 'Beginner’s Guide to Blockchain',
        duration: 980,
        uploadAt: '2025-05-22T18:45:00Z',
        thumbnail: 'https://i.ytimg.com/vi/TEBrs2QBgu0/maxresdefault.jpg',
        videoType: 'private',
        status: 'reviewPending',
        editor: 'Clara Mendes'
    },
    {
        id: '4',
        title: 'Deploy a Full Stack App with Docker',
        duration: 1340,
        uploadAt: '2025-05-23T09:00:00Z',
        thumbnail: 'https://i.ytimg.com/vi/TEBrs2QBgu0/maxresdefault.jpg',
        videoType: 'public',
        status: 'reviewPending',
        editor: 'Daniel Zhao'
    },
    {
        id: '5',
        title: 'UI/UX Design Trends 2025',
        duration: 760,
        uploadAt: '2025-05-24T15:15:00Z',
        thumbnail: 'https://i.ytimg.com/vi/TEBrs2QBgu0/maxresdefault.jpg',
        videoType: 'unlisted',
        status: 'reviewPending',
        editor: 'Eva Singh'
    },
    {
        id: '6',
        title: 'How Git Actually Works',
        duration: 870,
        uploadAt: '2025-05-25T13:00:00Z',
        thumbnail: 'https://i.ytimg.com/vi/TEBrs2QBgu0/maxresdefault.jpg',
        videoType: 'private',
        status: 'reviewPending',
        editor: 'Frank Lee'
    },
    {
        id: '7',
        title: 'Introduction to Web3 with Solidity',
        duration: 1105,
        uploadAt: '2025-05-26T20:00:00Z',
        thumbnail: 'https://i.ytimg.com/vi/TEBrs2QBgu0/maxresdefault.jpg',
        videoType: 'public',
        status: 'reviewPending',
        editor: 'Grace Kim'
    },
    {
        id: '8',
        title: 'The Power of TypeScript',
        duration: 890,
        uploadAt: '2025-05-27T17:30:00Z',
        thumbnail: 'https://i.ytimg.com/vi/TEBrs2QBgu0/maxresdefault.jpg',
        videoType: 'private',
        status: 'reviewPending',
        editor: 'Henry Adams'
    },
    {
        id: '9',
        title: 'Next.js 14 Features Overview',
        duration: 1040,
        uploadAt: '2025-05-28T11:00:00Z',
        thumbnail: 'https://i.ytimg.com/vi/TEBrs2QBgu0/maxresdefault.jpg',
        videoType: 'unlisted',
        status: 'reviewPending',
        editor: 'Isabella Roth'
    },
    {
        id: '10',
        title: 'AI Tools Every Developer Should Know',
        duration: 970,
        uploadAt: '2025-05-29T08:30:00Z',
        thumbnail: 'https://i.ytimg.com/vi/TEBrs2QBgu0/maxresdefault.jpg',
        videoType: 'public',
        status: 'reviewPending',
        editor: 'Jack Nguyen'
    }
];
