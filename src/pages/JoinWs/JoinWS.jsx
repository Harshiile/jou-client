import React, { useState } from 'react'
import { motion, AnimatePresence, useAnimate } from 'framer-motion'
import { Building2, Calendar, Tag, Users } from 'lucide-react';
import { useEffect } from 'react';
import { AsyncFetcher } from '../../lib/Fetcher'
import Loader from '../../components/loader'
import { useParams, useNavigate } from 'react-router-dom';
import { convertViews } from '../Dashboard/components/VideoCard'
import { toast } from 'sonner';

const JoinWS = () => {
    const [workspace, setWorkspace] = useState(null)
    const searchParams = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        AsyncFetcher({
            url: `/get/ws-metadata/${searchParams.linkParams}`,
            cb: ({ data }) => setWorkspace(data.channelMetaData)
        })
    }, [])



    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    const handleJoin = () => {
        AsyncFetcher({
            url: `/service/join/workspace/${searchParams.linkParams}`,
            cb: ({ message }) => {
                toast.success(message);
                navigate('/dashboard')
            },
            methodType: 'POST'
        })
    };

    const handleReject = (id) => {
        console.log(`Rejected workspace with id: ${workspace.id}`);
        toast.error('Request Decline')
        navigate('/dashboard')
    };



    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex items-center justify-center p-4"
        >
            {
                !workspace ?
                    <Loader />
                    :
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        className="w-[80vw] mx-auto mt-10 bg-secondary shadow-xl rounded-xl overflow-hidden text-white"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="relative">
                            <motion.div
                                className="h-24 bg-gradient-to-r from-primary to-white/70"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            />

                            <motion.div
                                className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-24"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="relative w-24 h-24 rounded-full border-4 border-white bg-white">
                                    <motion.img
                                        src={workspace.avatar}
                                        alt={`${workspace.name}'s avatar`}
                                        className="w-full h-full object-cover rounded-full"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    />
                                </div>
                            </motion.div>
                        </div>

                        <div className="px-64 pt-16 pb-8 text-center text-dull">
                            <motion.h1
                                variants={itemVariants}
                                className="text-2xl font-bold mb-1 text-dull"
                            >
                                {workspace.name}
                            </motion.h1>

                            <motion.p
                                variants={itemVariants}
                                className="text-dull font-medium mb-3"
                            >
                                {workspace.userHandle}
                            </motion.p>

                            <motion.p
                                variants={itemVariants}
                                className="text-dull mb-6 max-w-lg mx-auto"
                            >
                                {workspace.description}
                            </motion.p>

                            <motion.div
                                variants={itemVariants}
                                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                            >
                                <motion.div
                                    className="flex flex-col items-center"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="flex items-center text-dull mb-1">
                                        <Users size={18} className="mr-1" />
                                    </div>
                                    <motion.p
                                        className="text-dull font-semibold"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        {convertViews(workspace.totalSubscribers.toString())}
                                    </motion.p>
                                    <p className="text-dull text-sm">Subscribers</p>
                                </motion.div>

                                <motion.div
                                    className="flex flex-col items-center"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="flex items-center text-dull mb-1">
                                        <Building2 size={18} className="mr-1" />
                                    </div>
                                    <motion.p
                                        className="text-dull font-semibold"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        {workspace.totalVideos}
                                    </motion.p>
                                    <p className="text-dull text-sm">Videos</p>
                                </motion.div>

                                <motion.div
                                    className="flex flex-col items-center"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="flex items-center text-dull mb-1">
                                        <Calendar size={18} className="mr-1" />
                                    </div>
                                    <motion.p
                                        className="text-dull font-semibold"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        {new Date(workspace.dateCreated).toLocaleDateString('en-US', {
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </motion.p>
                                    <p className="text-dull text-sm">Created</p>
                                </motion.div>

                                <motion.div
                                    className="flex flex-col items-center"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="flex items-center text-dull mb-1">
                                        <Tag size={18} className="mr-1" />
                                    </div>
                                    <motion.p
                                        className="text-dull font-semibold"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        {workspace.tags.length}
                                    </motion.p>
                                    <p className="text-dull text-sm">Tags</p>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="flex flex-wrap justify-center gap-2 mb-8"
                            >
                                <AnimatePresence>
                                    {workspace.tags.map((tag, index) => (
                                        <motion.span
                                            key={tag}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="px-3 py-1 bg-primary/5 text-dull rounded-full text-sm font-medium"
                                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(15, 15, 18, 0.1)' }}
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </AnimatePresence>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="flex justify-center gap-4 mt-6"
                            >
                                <motion.button
                                    onClick={handleJoin}
                                    className="bg-primary text-white px-8 py-3 rounded-lg font-medium"
                                    whileHover={{ scale: 1.05, backgroundColor: 'white', color: 'black', cursor: 'pointer' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Join Workspace
                                </motion.button>
                                <motion.button
                                    onClick={handleReject}
                                    className="bg-white text-black text-dull px-8 py-3 rounded-lg font-medium"
                                    whileHover={{ scale: 1.05, backgroundColor: 'red', color: 'white', cursor: 'pointer' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Decline
                                </motion.button>
                            </motion.div>
                        </div>
                    </motion.div>
            }
        </motion.div>
    )
}

export default JoinWS