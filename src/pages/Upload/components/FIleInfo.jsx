import React from 'react';
import { motion } from 'framer-motion';
import { X, FileText } from 'lucide-react';

const fadeSlide = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } },
};

const FileInfo = ({ file, setFile, setVideoPreviewUrl }) => {
    return (
        <motion.div
            variants={fadeSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
            className='relative bg-[#18181b] border border-secondary rounded-xl p-4 shadow-md flex items-center gap-4 text-sm text-[#d4d4d8]'
        >
            <FileText className='w-10 h-10 text-primary' />
            <div className='flex flex-col gap-1'>
                <p className='text-md font-medium text-[#f4f4f5]'>{file.name}</p>
                <p className='text-xs text-[#a1a1aa]'>Size: {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>

            <X
                className='w-6 h-6 cursor-pointer absolute top-2 right-2 text-[#a1a1aa] hover:text-red-500 transition-colors rounded-full p-1 hover:bg-secondary'
                onClick={() => {
                    setFile(null);
                    setVideoPreviewUrl(null);
                }}
            />
        </motion.div>
    );
};

export default FileInfo;