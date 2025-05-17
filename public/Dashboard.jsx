import React from 'react'

const Dashboard = () => {
    return (
        <motion.div
            className="flex flex-col gap-y-10 h-[90vh] mt-7 overflow-y-auto pb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <ChannelDrawer
                open={isDrawerOpen}
                onOpenChange={setIsDrawerOpen}
                filterVideos={filterVideos}
                setFilterVideos={setFilterVideos}
                channel={channel}
            />

            {/* Workspaces */}
            <motion.div
                className="w-[85vw] mx-auto border-2 border-secondary p-5 px-8 rounded-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <p className="text-xl font-bold mb-4">WorkSpaces</p>
                {!workSpaces ? (
                    <Loader />
                ) : workSpaces.length <= 0 ? (
                    <p className="text-white">Ready to Join a Team? No Workspaces Joined Yet</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {workSpaces.map((ws) => (
                            <motion.div
                                key={ws.id}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="border border-secondary bg-primary py-4 px-6 rounded-xl shadow-sm hover:shadow-lg cursor-pointer"
                                onClick={() => {
                                    setChannel(ws);
                                    fetchVideos(ws.id);
                                    setIsDrawerOpen(true);
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
                                        <p className="text-sm text-gray-400">
                                            {ws.userHandle} • {convertViews(ws.subscribers?.toString())} Subscribers
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>

            {/* Pending Reviews */}
            <motion.div
                className="w-[85vw] mx-auto border-2 border-yellow-400 p-5 rounded-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <p className="text-xl font-bold text-yellow-300 mb-4">Pending Reviews</p>
                <ul className="space-y-3">
                    {[...Array(2)].map((_, i) => (
                        <li key={i} className="flex justify-between items-center bg-zinc-800 p-3 rounded-md">
                            <span className="text-white">Video Title #{i + 1}</span>
                            <button className="bg-yellow-500 text-black px-4 py-1 rounded hover:bg-yellow-400">Review</button>
                        </li>
                    ))}
                </ul>
            </motion.div>

            {/* Analytics Widget */}
            <motion.div
                className="w-[85vw] mx-auto border-2 border-green-500 p-5 rounded-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <p className="text-xl font-bold text-green-300 mb-4">Workspace Analytics</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
                    <div className="bg-green-800/40 p-4 rounded-lg">
                        <p className="text-sm">Videos Uploaded</p>
                        <p className="text-lg font-bold">23</p>
                    </div>
                    <div className="bg-green-800/40 p-4 rounded-lg">
                        <p className="text-sm">Pending Approvals</p>
                        <p className="text-lg font-bold">6</p>
                    </div>
                    <div className="bg-green-800/40 p-4 rounded-lg">
                        <p className="text-sm">Rejected Videos</p>
                        <p className="text-lg font-bold">2</p>
                    </div>
                    <div className="bg-green-800/40 p-4 rounded-lg">
                        <p className="text-sm">Active Editors</p>
                        <p className="text-lg font-bold">5</p>
                    </div>
                </div>
            </motion.div>

        </motion.div>
    )
}

export default Dashboard
