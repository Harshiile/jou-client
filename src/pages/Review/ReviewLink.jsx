import React, { useRef } from 'react'
import { useState } from 'react'
import { Eye, ThumbsUp, Clock, MessageCircle, Calendar, AlertTriangle, ThumbsDown } from 'lucide-react'
import { motion } from 'framer-motion'
// import videoPublic from '/video.mp4'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Button } from '../../components/ui/button'
import { useUser } from '../../context/user'
import EditorView from './EditorView'
import { useEffect } from 'react'
import { AsyncFetcher } from '../../lib/Fetcher'
import { useParams } from 'react-router-dom'
import FullLoader from '../../components/fullLoader'
import PastLink from './PastLink'

const ReviewLink = () => {
    const [user] = useUser()
    const searchParams = useParams()
    const [isVideoProcessDone, setIsVideoProcessDone] = useState(false)
    const [isVideoHovered, setIsVideoHovered] = useState(false);
    const [confirmApprove, setConfirmApprove] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [dialogData, setDialogData] = useState({
        title: null,
        desc: null,
        cta: null
    })
    const [confirmReject, setConfirmReject] = useState(false);
    const [isLoading, setisLoading] = useState(true)
    const [videoDetails, setVideoDetails] = useState(null)


    useEffect(() => {
        const { link } = searchParams
        if (link) {
            AsyncFetcher({
                url: `/get/video-metadata/${link}`,
                cb: ({ data }) => {
                    if (data.error) setIsVideoProcessDone(true)
                    else setVideoDetails(data?.videoDetails)
                }
            })
        }
    }, [])


    const handleApprove = () => {
        if (!confirmApprove) {
            setConfirmApprove(true);
            return;
        }
        // onApprove(video.id);
    };

    const handleReject = () => {
        if (!confirmReject) {
            setConfirmReject(true);
            return;
        }
        // onReject(video.id);
    };
    return (
        <>
            {
                isVideoProcessDone ?
                    <PastLink />
                    :
                    <>
                        {!videoDetails ?
                            <FullLoader />
                            :
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
                                                        src={videoDetails?.channelAvatar}
                                                        alt={videoDetails?.channelName}
                                                        className='w-full h-full rounded-full object-cover border border-secondary'
                                                    />
                                                </div>

                                                {/* Channel Info */}
                                                <div className='flex-1 flex flex-col justify-center'>
                                                    <div className='flex items-center space-x-1'>
                                                        <span className='font-bold text-gray-100'>{videoDetails?.channelName}</span>
                                                        <span className='text-gray-400 text-sm'>
                                                            {videoDetails?.channelUserHandle}
                                                        </span>
                                                    </div>
                                                    <div className='text-gray-400 text-xs line-clamp-1'>{videoDetails?.videoTitle}</div>
                                                </div>

                                                {/* Review Status */}
                                                <div className='px-3 py-1 bg-amber-600/30 text-amber-400 text-xs rounded-full font-medium'>
                                                    Pending Review
                                                </div>
                                            </div>

                                            {isLoading && <FullLoader />}
                                            {/* Video */}
                                            <div
                                                className='relative w-full h-[85vh] group'
                                                onMouseEnter={() => setIsVideoHovered(true)}
                                                onMouseLeave={() => setIsVideoHovered(false)}
                                            >
                                                {/* Video Player or Fallback Image */}
                                                <video
                                                    controls
                                                    controlsList='nodownload'
                                                    disablePictureInPicture
                                                    className='w-full h-full object-cover'
                                                    onLoadedData={_ => setisLoading(false)}
                                                >
                                                    <source
                                                        src={`http://localhost:3000/api/get/stream/file?type=video&id=${videoDetails?.fileId}`}
                                                        type='video/mp4'
                                                    />
                                                </video>

                                                {/* Title Overlay - shown when video is paused or on hover */}
                                                <motion.div
                                                    initial={{ y: -50, opacity: 0 }}
                                                    animate={isVideoHovered ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                    className="absolute top-0 left-0 m-4 p-2 rounded-md text-white font-bold text-lg max-w-[90%]"
                                                    style={{
                                                        // backgroundColor: 'rgba(255, 255, 255, 0.15)',  // light translucent white
                                                    }}
                                                >
                                                    {videoDetails?.videoTitle}
                                                </motion.div>

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
                        }
                    </>
            }
        </>
    )
}

export default ReviewLink
