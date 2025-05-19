import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Users, Hash, CalendarDays } from 'lucide-react';

const WorkspaceSlider = ({ workspace }) => {
    return (
        <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="fixed bottom-4 left-[8vw] w-[40%] bg-primary shadow-2xl rounded-lg p-4 z-50 text-white border border-secondary"
        >
            <div className="flex gap-4 pl-10">
                {/* Workspace Avatar */}
                <img
                    src={workspace.avatar}
                    alt={workspace.name}
                    className="w-[15%] h-[105%] aspect-square object-cover rounded-full border-4 border-secondary shadow-md"
                />

                {/* Metadata */}
                <div className="flex flex-col gap-y-1">
                    <h4 className="font-bold text-xl">{workspace.name}</h4>
                    <p className="text-sm text-dull line-clamp-2">{workspace.desc}</p>

                    {/* Handle & Total Videos */}
                    <div className="mt-2 text-sm space-y-1">
                        <div className="flex items-center gap-2">
                            <Hash className="w-4 h-4" />
                            <span>@{workspace.userHandle}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{workspace.totalVideos} videos uploaded</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarDays className="w-4 h-4" />
                            {/* <span>Created on: {format(new Date(workspace.createdAt), 'do MMM yyyy')}</span> */}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default WorkspaceSlider;
