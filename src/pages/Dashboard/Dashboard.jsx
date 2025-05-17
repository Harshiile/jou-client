import React, { useEffect, useState } from 'react';
import { AsyncFetcher } from '../../lib/Fetcher';
import { useUser } from '../../context/user';
import { useAccessToken } from '../../context/acsTkn';
import { useWorkSpaces } from '../../context/workspaces';
import { useVideos } from '../../context/videos';
import Calender from './components/Schedule/components/Calender'
import { ChannelDrawer } from './components/ChannelDrawer';
import { convertViews } from './components/VideoCard';
import Loader from '../../components/loader';
import { motion } from 'framer-motion';
import PendingReviewVideos from './components/PendingReview';

const Dashboard = () => {
    const [user] = useUser();
    const [accessToken, setAccessToken] = useAccessToken();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [videos, setVideos] = useVideos();
    const [filterVideos, setFilterVideos] = useState();
    const [recentVideos, setRecentVideos] = useState(null);
    const [workSpaces, setWorkSpaces] = useWorkSpaces();
    const [channel, setChannel] = useState(null);

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
        <div className='flex flex-col items-center justify-center w-full h-full px-8 gap-y-6'>
            <div className='w-full h-[50%] flex gap-x-6'>
                <div className='w-[73%] border-2 border-secondary rounded-md p-4 ' >
                    Pending Videos
                    <PendingReviewVideos />
                </div>
                <div className='w-[27%] border-2 border-secondary rounded-md p-4 text-xl'>
                    Schedule
                    <Calender videos={tmpVideos} />
                </div>
            </div>
            <div className='w-full h-[40%] border-2 border-secondary rounded-md p-4'>
                Workspaces
            </div>
        </div>
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
