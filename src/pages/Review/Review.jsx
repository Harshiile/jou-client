import React from 'react'
import { useState } from 'react'
import { Eye, ThumbsUp, Clock, MessageCircle, Calendar, AlertTriangle, ThumbsDown } from 'lucide-react'
import { motion } from 'framer-motion'
import videoPublic from '/video.mp4'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Button } from '../../components/ui/button'
import { useUser } from '../../context/user'
import EditorView from './EditorView'

const video = {
    id: "dQw4w9WgXcQ",
    title: "Rick Astley - Never Gonna Give You Up (Official Music Video)",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "3:33",
    views: 1360000000,
    likes: 14500000,
    comments: 1200000,
    channelName: "Rick Astley",
    channelAvatar: "https://avatars.githubusercontent.com/u/140196543?v=4",
    description: `The official video for “Never Gonna Give You Up” by Rick Astley
  Listen to Rick Astley: https://RickAstley.lnk.to/_listenYD`,
    uploadDate: "2009-10-25"
};


const Review = () => {
    const [user] = useUser()
    const [confirmApprove, setConfirmApprove] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [dialogData, setDialogData] = useState({
        title: null,
        desc: null,
        cta: null
    })
    const [confirmReject, setConfirmReject] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const handleApprove = () => {
        if (!confirmApprove) {
            setConfirmApprove(true);
            return;
        }
        onApprove(video.id);
    };

    const handleReject = () => {
        if (!confirmReject) {
            setConfirmReject(true);
            return;
        }
        onReject(video.id);
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full h-full bg-primary rounded-xl shadow-lg overflow-hidden"
        >
            {
                user.userType == 'editor' ?
                    <EditorView />
                    :
                    <>
                        {/* Header */}
                        <div className='bg-primary h-16 border-b border-secondary flex items-center p-3 space-x-3'>
                            {/* Channel Avatar */}
                            <div className='h-10 w-10 flex-shrink-0'>
                                <img
                                    src={video.channelAvatar}
                                    alt={video.channelName}
                                    className='w-full h-full rounded-full object-cover border border-secondary'
                                />
                            </div>

                            {/* Channel Info */}
                            <div className='flex-1 flex flex-col justify-center'>
                                <div className='flex items-center space-x-1'>
                                    <span className='font-bold text-gray-100'>{video.channelName}</span>
                                    <span className='text-gray-400 text-sm'>
                                        {video.channelHandle ? `@${video.channelHandle}` : '@' + video.channelName.toLowerCase().replace(/\s+/g, '')}
                                    </span>
                                </div>
                                <div className='text-gray-400 text-xs line-clamp-1'>{video.title}</div>
                            </div>

                            {/* Review Status */}
                            <div className='px-3 py-1 bg-amber-600/30 text-amber-400 text-xs rounded-full font-medium'>
                                Pending Review
                            </div>
                        </div>

                        {/* Video */}
                        <div className='relative w-full h-[85vh] group'>
                            {/* Video Player or Fallback Image */}
                            {!videoError ? (
                                <video
                                    src={videoPublic}
                                    className="w-full h-full object-cover"
                                    controls
                                    onPlay={() => setIsPlaying(true)}
                                    onPause={() => setIsPlaying(false)}
                                    onError={() => setVideoError(true)}
                                />
                            ) : (
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover"
                                />
                            )}

                            {/* Title Overlay - shown when video is paused or on hover */}
                            <div
                                className={`absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/80 to-transparent
          transition-opacity duration-300 ${isPlaying && !videoError ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
                                style={{ backdropFilter: 'blur(8px)' }}
                            >
                                <h2 className='text-white text-lg md:text-xl font-bold text-shadow line-clamp-2'>
                                    {video.title}
                                </h2>
                            </div>
                        </div>


                        {/* MetaData */}

                        {/* Footer */}
                        <div className='p-4 bg-primary border-t border-secondary flex justify-between items-center'>

                            <div className='flex items-center gap-3 w-full md:w-auto justify-end'>
                                <button
                                    // onClick={onRejectClick}
                                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 
                                bg-red-900 text-white 
                                hover:bg-red-600  hover:text-gray-200 hover:font-bold`}
                                >
                                    {confirmReject ? (
                                        <>
                                            <AlertTriangle size={18} className="text-red-400" />
                                            <span>Confirm Rejection</span>
                                        </>
                                    ) : (
                                        <div className='flex items-center gap-x-2' onClick={() => {
                                            setDialogData({
                                                title: 'Video Rejection',
                                                desc: 'Are you sure to reject this video?',
                                                cta: 'Reject'
                                            })
                                            setConfirmDialog(true)
                                        }}>
                                            <ThumbsDown size={18} />
                                            <span>Reject</span>
                                        </div>
                                    )}
                                </button>

                                <button
                                    // onClick={onApproveClick}
                                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300
                            bg-white/90 text-black   animate-pulse'
                                 hover:bg-white hover:font-bold`}
                                >
                                    {confirmApprove ? (
                                        <>
                                            <AlertTriangle size={18} className="text-green-400" />
                                            <span>Confirm Approval</span>
                                        </>
                                    ) : (
                                        <div className='flex items-center gap-x-2' onClick={() => {
                                            setDialogData({
                                                title: 'Video Upload Approval',
                                                desc: 'Once Approves, then no getting back',
                                                cta: 'Approve'
                                            })
                                            setConfirmDialog(true)
                                        }}>
                                            <ThumbsUp size={18} />
                                            <span>Approve</span>
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>



                        <Dialog open={confirmDialog} onOpenChange={setConfirmDialog}>
                            <DialogContent className='bg-primary border-none'>
                                <DialogHeader>
                                    <DialogTitle>{dialogData.title}</DialogTitle>
                                </DialogHeader>
                                <p>{dialogData.desc}</p>
                                <DialogFooter className="mt-4">
                                    <Button variant="outline" onClick={() => setConfirmDialog(false)} className='text-black'>
                                        Cancel
                                    </Button>
                                    <Button className={dialogData.cta == 'Approve' ? "bg-green-400 text-black" : "bg-red-500"}>
                                        {dialogData.cta}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </>
            }
        </motion.div >
    )
}

export default Review














{/* <motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
className="w-full h-full bg-primary rounded-xl shadow-lg overflow-hidden"
>
<div className='bg-primary h-[7vh] border-b border-secondary flex flex-col justify-center pl-4'>
    <span className='font-bold text-md'>{video.title}</span>
    <span className='text-dull text-sm'>{video.description}</span>
</div>

<div className='relative h-[83vh]'>
    <video
        src={videoPublic}
        className="w-full h-full object-cover rounded-2xl"
        alt={video.title}
        controls
    />

    <div className='absolute text-black top-5 left-5'>{video.title}</div>
</div>

<div className=''>

</div>
</motion.div > */}