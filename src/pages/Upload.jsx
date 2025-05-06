import React, { useEffect, useRef, useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '../components/ui/drawer';
import { Progress } from '../components/ui/progress';
import { toast } from "sonner";
import { UploadCloud, Loader, Loader2, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion';
import { socket } from '../socket';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null)
    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false)
    const [progress, setProgress] = useState(0)


    useEffect(() => {
        socket.on('uploading-progress', ({ percentage }) => setProgress(percentage))
        return () => {
            socket.off('uploading-progress')
        }
    }, [])

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleUpload = e => {
        e.preventDefault()

        socket.connect()

        if (!file) {
            toast.error("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setIsUploading(true)

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/drive/upload`, {
            method: 'POST',
            body: formData,
            headers: {
                'socket': socket.id
            }
        })
            .then(res => {
                if (!res.ok) throw new Error('Uploading failed');
                else return res.json()
            })
            .then(res => {
                setIsUploading(false);
                console.log(res);
                toast.success(res.message)
            })

    };
    const onDrawerChange = () => {
        if (isUploading && !open) return;
        setIsUploading(true)
    }
    return (
        <div className='w-[25vw] min-w-[300px] px-6 py-8 border border-[#27272a] rounded-2xl bg-[#0f0f12] text-[#e3e3e3] shadow-lg flex flex-col gap-y-6'>

            <p className='text-2xl font-bold text-center'>Upload Video</p>
            <form formEncType="multipart/form-data" onSubmit={handleUpload} >
                <input
                    id='file'
                    type='file'
                    accept='video/*'
                    className='hidden'
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />

                {/* Clickable upload box */}
                {
                    !previewUrl ?
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className='flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-[#3f3f46] rounded-lg cursor-pointer hover:bg-[#1f1f25] transition-colors duration-200 ease-in-out'
                        >
                            <UploadCloud className='w-10 h-10 text-[#a1a1aa]' />
                            <p className='text-sm text-[#d4d4d8]'>Click to upload video</p>
                            <p className='text-xs text-[#71717a]'>MP4, WebM, or MOV</p>
                        </div>
                        :
                        <video
                            src={previewUrl}
                            controls
                            controlsList="nodownload"
                            disablePictureInPicture
                            disableRemotePlayback
                            className='rounded-xl border border-[#27272a] shadow-lg' />
                }

                {/* File info preview */}
                <AnimatePresence>
                    {file && (
                        <motion.div
                            key="file-info"
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className='bg-[#18181b] border border-[#27272a] rounded-md p-3 text-sm text-[#d4d4d8] relative'
                        >

                            <X className='w-6 h-6 cursor-pointer absolute z-10 top-1.5 right-1.5 text-[#a1a1aa] hover:text-red-500 transition-colors rounded-full p-1 hover:bg-[#27272a]' onClick={() => {
                                setFile(null);
                                setPreviewUrl(null);
                            }} />
                            <p><strong>Selected :</strong> {file.name}</p>
                            <p><strong>Size :</strong> {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Upload button */}
                <Drawer open={isUploading} onOpenChange={onDrawerChange}>
                    {/* <DrawerTrigger asChild> */}
                    <input
                        type='submit'
                        value='Upload'
                        className='w-full bg-white text-black px-2 py-2 rounded-md mt-4 font-semibold'
                    />
                    {/* </DrawerTrigger> */}
                    <DrawerContent className='bg-[#0f0f12] w-[55%] mx-auto flex flex-col gap-y-4'>
                        <Loader2 className='h-10 w-10 animate-spin mx-auto' />
                        <DrawerTitle className='text-center text-white text-xl mb-2'>Uploading</DrawerTitle>
                        <Progress value={progress} className='h-3.5 w-[85%] mx-auto mb-5 bg-[#39393b] [&>*]:bg-white' />
                    </DrawerContent>
                </Drawer>
            </form>
        </div >
    );
};

export default Upload;
