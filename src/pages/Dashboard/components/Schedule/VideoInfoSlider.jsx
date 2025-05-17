import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';
import { getTypeBadgeStyle } from '../VideoCard';

const VideoInfoSlider = ({ video }) => {
    return (
        <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="fixed bottom-4 left-[8vw] w-[40%] bg-primary shadow-2xl rounded-lg p-4 z-50 text-white border border-secondary"
        >
            <div className="flex gap-3 pl-10">
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-[30%] object-cover rounded"
                />
                <div className="flex flex-col gap-y-1">
                    <div className='flex justify-between'>
                        <h4 className="font-bold text-base">{video.title}</h4>
                        <span className={`text-xs font-bold rounded px-2 py-0.5 h-5 ${getTypeBadgeStyle(video.videoType)}`}>
                            {video.videoType.toUpperCase()}
                        </span>
                    </div>
                    <p className="text-xs text-dull line-clamp-2">{video.desc}</p>
                    <div className="font-bold text-base mt-3 flex gap-x-3 bg-secondary py-1 px-2 rounded-md items-center">
                        <Clock className='w-5 h-5' />
                        Uploading on : {format(new Date(video.uploadAt), 'do MMMM yyyy, h:mm a')}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default VideoInfoSlider;
