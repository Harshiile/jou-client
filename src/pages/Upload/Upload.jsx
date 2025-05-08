import React, { useEffect, useRef, useState } from 'react';
import UploaderDrawer from './components/Drawer';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Separator } from '../../components/ui/separator';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { toast } from "sonner";
import { UploadCloud } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { socket } from '../../socket';
import FIleInfo from './components/FIleInfo';
import { Schedule } from './components/Schedule';

const fadeIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const Upload = () => {
    const [file, setFile] = useState(null);
    const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
    const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState(null);
    const videoInputRef = useRef(null);
    const thumbnailInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [title, setTitle] = useState('');
    const [videoType, setVideoType] = useState('');
    const [date, setDate] = useState(new Date());
    const [desc, setDesc] = useState('');

    useEffect(() => {
        socket.on('uploading-progress', ({ percentage }) => setProgress(percentage));
        return () => socket.off('uploading-progress');
    }, []);

    const handleVideoChange = (e) => {
        if (e.target.files?.length) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setVideoPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleThumbnailChange = (e) => {
        if (e.target.files?.length) {
            const selectedFile = e.target.files[0];
            setThumbnailPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleUpload = (e) => {
        e.preventDefault();
        if (!file) return toast.error("Please select a video first.");
        console.log({ title, desc, date, videoType });
    };

    return (
        <div className='w-full h-full px-8 bg-primary text-[#e3e3e3] shadow-xl flex flex-col'>

            {/* Upload Title */}
            <p className='text-3xl font-bold text-center py-3 mb-4' >Upload Video</p>

            {/* Upload Section */}
            <div className='flex'>

                {/* Left Section */}
                <ScrollArea className="h-[100vh] flex flex-col gap-y-6 flex-1">
                    <form formEncType="multipart/form-data" onSubmit={handleUpload} className='flex flex-col gap-y-6'>

                        <div className='flex flex-col gap-y-4'>
                            <div>
                                <Label htmlFor='title' className='text-md mb-2'>Title</Label>
                                <Input id='title' className='border border-secondary' placeholder='Video Title' value={title} onChange={e => setTitle(e.target.value)} />
                            </div>

                            <div>
                                <Label htmlFor='title' className='text-md mb-2'>Description</Label>
                                <Textarea className='border border-secondary' placeholder='Video Description' value={desc} onChange={e => setDesc(e.target.value)} />
                            </div>

                            <div>
                                <Label htmlFor='title' className='text-md mb-2'>Schedule</Label>
                                <Schedule date={date} setDate={setDate} />
                            </div>

                            <div>
                                <Label className='text-md mb-2'>Video Type</Label>
                                <Select onValueChange={setVideoType}>
                                    <SelectTrigger className='w-full border border-secondary'>
                                        <SelectValue placeholder='Select Type' />
                                    </SelectTrigger>
                                    <SelectContent className='bg-primary text-[#e3e3e3]'>
                                        <SelectItem value='0'>Public</SelectItem>
                                        <SelectItem value='1'>Private</SelectItem>
                                        <SelectItem value='2'>Unlisted</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Thumbnail */}
                            <div>
                                <Label htmlFor='thumbnail' className='text-md mb-2'>Thumbnail</Label>
                                <input hidden id='thumbnail' type='file' accept='image/*' ref={thumbnailInputRef} onChange={handleThumbnailChange} />

                                <AnimatePresence>
                                    {!thumbnailPreviewUrl ? (
                                        <motion.div
                                            className='flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-[#3f3f46] rounded-xl cursor-pointer hover:bg-[#1f1f25] transition duration-300'
                                            onClick={() => thumbnailInputRef.current?.click()}
                                            variants={fadeIn} initial='hidden' animate='visible' exit='exit'
                                        >
                                            <UploadCloud className='w-12 h-12 text-[#a1a1aa]' />
                                            <p className='text-md text-[#d4d4d8]'>Click to upload thumbnail</p>
                                            <p className='text-xs text-[#71717a]'>JPG, PNG, or WEBP</p>
                                        </motion.div>
                                    ) : (
                                        <motion.img
                                            src={thumbnailPreviewUrl}
                                            className='rounded-xl border border-secondary shadow-lg max-h-[30vh] w-full object-contain'
                                            variants={fadeIn} initial='hidden' animate='visible' exit='exit'
                                        />
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Upload Button */}
                        <UploaderDrawer isUploading={isUploading} setIsUploading={setIsUploading} progress={progress} />
                    </form>
                </ScrollArea>

                <Separator orientation='vertical' className='mx-12 bg-secondary w-[2px]' />

                {/* Right Section */}
                <div className='flex flex-col gap-y-6 flex-1'>
                    <div>
                        <Label htmlFor='file' className='text-md mb-2'>Video</Label>
                        <input hidden id='file' type='file' accept='video/*' ref={videoInputRef} onChange={handleVideoChange} />
                        <AnimatePresence>
                            {!videoPreviewUrl ? (
                                <motion.div
                                    className='flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-[#3f3f46] rounded-xl cursor-pointer hover:bg-[#1f1f25] transition duration-300'
                                    onClick={() => videoInputRef.current?.click()}
                                    variants={fadeIn} initial='hidden' animate='visible' exit='exit'
                                >
                                    <UploadCloud className='w-12 h-12 text-[#a1a1aa]' />
                                    <p className='text-md text-[#d4d4d8]'>Click to upload video</p>
                                    <p className='text-xs text-[#71717a]'>MP4, WebM, or MOV</p>
                                </motion.div>
                            ) : (
                                <motion.video
                                    src={videoPreviewUrl}
                                    controls
                                    controlsList='nodownload'
                                    disablePictureInPicture
                                    disableRemotePlayback
                                    className='rounded-xl border border-secondary shadow-lg mb-3 w-full'
                                    variants={fadeIn} initial='hidden' animate='visible' exit='exit'
                                />
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {file && (
                                <FIleInfo file={file} setFile={setFile} setVideoPreviewUrl={setVideoPreviewUrl} />
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;