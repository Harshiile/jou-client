import { Clock, Eye } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Duration } from 'luxon'
import nonThumbnail from '/nonThumbnail.jpg'
import { Button } from '../../../components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../../../components/ui/dialog'
import { AsyncFetcher } from '../../../lib/Fetcher'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Schedule } from '../../Upload/components/Schedule'
import { toast } from 'sonner'

export const getTypeBadgeStyle = (type) => {
    switch (type.toLowerCase()) {
        case "private":
            return "bg-red-500/20 text-red-500";
        case "unlisted":
            return "bg-gray-700/50 text-gray-300";
        case "public":
            return "bg-blue-500/20 text-blue-400";
        default:
            return "bg-gray-600 text-white";
    }
}

const getStatusBadgeStyle = (status) => {
    switch (status) {
        case "uploaded":
            return " bg-[#04210f] text-green-500"
        case "uploadPending":
            return "bg-amber-500/20 text-amber-500"
        case "reviewPending":
            return "bg-blue-500/20 text-blue-500"
        default:
            return "bg-gray-500/20 text-gray-400"
    }
}

const getStatusLabel = (status) => {
    switch (status) {
        case "uploadPending":
            return "Uploading Pending"
        case "reviewPending":
            return "Review Pending"
        case "uploaded":
            return "Uploaded"
        default:
            return status
    }
}

export const convertViews = (views) => {
    const vLength = views?.length
    if (vLength < 4) return views
    if (vLength >= 4 && vLength <= 6) return `${(views / 1000).toFixed(views >= 1000 ? 0 : 1)} K`;
    if (vLength >= 7 && vLength <= 9) return `${(views / 1000000).toFixed(views >= 1000000 ? 0 : 1)} M`;
    if (vLength >= 10) return `${(views / 1000000000).toFixed(1)} B`;
}

const convertPublishTime = (date) => {
    const now = new Date();
    const past = new Date(date);
    const seconds = Math.floor((now - past) / 1000);

    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 }
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }

    return 'Just now';
}

const convertDate = (date) => {
    date = new Date(date)
    const weekday = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        timeZone: 'UTC',
    }).format(date);

    const dayMonth = new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'short',
        timeZone: 'UTC',
    }).format(date);

    const time = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC',
    }).format(date);

    return `${weekday}, ${dayMonth} - ${time}`;
}

const convertTime = (duration) => {
    let formattedDuration = ' ';
    const dur = Duration.fromISO(duration);
    if (dur.hours > 0) formattedDuration += `${dur.hours.toString()}:`
    if (dur.minutes > 0) formattedDuration += `${dur.minutes.toString()}:`
    if (dur.seconds > 0) formattedDuration += `${dur.seconds.toString()}`
    return formattedDuration
}

const VideoCard = ({ video, userType, isForDialog, channel, className }) => {
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [date, setDate] = useState(null)
    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-primary border-none py-40 px-120">
                    <DialogHeader className="absolute top-5 left-1/2 -translate-x-1/2 text-center">
                        <DialogTitle className="text-2xl">Change Schedule Time</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col items-center justify-center gap-y-2 mt-20 absolute left-1/2 -translate-x-1/2 w-full px-10">
                        <Schedule id="schedule" date={date} setDate={setDate} />

                        <VideoCard
                            video={video}
                            isForDialog={true}
                            className={'w-[45vw]'}
                        />

                        <Button
                            className="border border-secondary bg-white text-black hover:bg-white hover:text-black px-20 font-semibold text-md"
                            onClick={_ => AsyncFetcher({
                                url: `/video/update/schedule?id=${video.id}&schedule=${date}`,
                                cb: ({ message }) => { toast.success(message); setIsDialogOpen(false) }
                            })}
                        >
                            Change
                        </Button>
                    </div>

                </DialogContent>
            </Dialog>

            <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className='my-4'
            >
                <Link
                    key={video.id}
                    to={video?.url}
                    onClick={e => video.status !== 'uploaded' && e.preventDefault()}
                    whilehover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className={`flex items-center justify-between rounded-lg overflow-hidden bg-primary shadow-sm transition-shadow over:shadow-xl text-white cursor-auto py-3 px-3 ${className}`}
                >

                    {/* Left Section */}
                    <div className="flex items-start gap-x-4 flex-1">
                        <div className="relative h-[80px] w-[140px] flex-shrink-0 overflow-hidden rounded-md group">
                            <motion.img
                                src={
                                    video.thumbnail
                                        ? video.status !== 'uploaded'
                                            ? `http://localhost:3000/api/get/stream/file?type=image&id=${video.thumbnail}`
                                            : video.thumbnail
                                        : nonThumbnail
                                }
                                alt={video.title}
                                className="h-full w-full object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
                            />
                            {video.duration && (
                                <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                                    {convertTime(video.duration)}
                                </span>
                            )}
                        </div>

                        {/* Video info */}
                        <div className="flex flex-col justify-between flex-1 gap-y-1">
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-semibold line-clamp-2">{video.title}</h3>
                                {video.videoType && (
                                    <span className={`text-xs font-bold rounded px-2 py-0.5 ${getTypeBadgeStyle(video.videoType)}`}>
                                        {video.videoType.toUpperCase()}
                                    </span>
                                )}
                            </div>

                            {userType === 'editor' && (
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <img
                                        src={video.channel?.avatar || "/placeholder.svg"}
                                        alt={video.channel?.handle}
                                        className="w-5 h-5 rounded-full"
                                    />
                                    <span>{video.channel?.handle}</span>
                                </div>
                            )}

                            {video.status === 'uploaded' ? (
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Eye className="h-3.5 w-3.5" />
                                        <span>{convertViews(video.views)}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-3.5 w-3.5" />
                                        <span>{convertPublishTime(video.publishedAt)}</span>
                                    </div>
                                </div>
                            ) : (
                                video.willUploadAt && (
                                    <div className="flex items-center gap-x-2 text-sm text-muted-foreground">
                                        <Clock className="h-3.5 w-3.5" />
                                        {
                                            isForDialog ?
                                                <span>
                                                    Previous Scheudle Time : {convertDate(video.willUploadAt)}
                                                </span>
                                                :
                                                <span>
                                                    Scheduled to upload on {convertDate(video.willUploadAt)}
                                                </span>
                                        }
                                        {
                                            !isForDialog &&
                                            <button
                                                className='border border-secondary px-2 py-1 rounded-md ml-4 text-white hover:border-white'
                                                onClick={_ => {
                                                    setDate(new Date())
                                                    setIsDialogOpen(true)
                                                }}
                                            >Change Schedule Time</button>
                                        }
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* Right Badge + Button */}
                    <div className='flex gap-x-4 items-center'>
                        <span
                            className={`text-xs rounded-md px-3 py-1 flex items-center gap-x-2 ${getStatusBadgeStyle(video.status)}`}
                        >
                            <p className="font-bold text-md">@{video.editor}</p>
                        </span>
                        <span
                            className={`text-xs rounded-md px-3 py-2 flex items-center gap-x-2 ${getStatusBadgeStyle(video.status)}`}
                        >
                            <Clock className="w-4 h-4" />
                            <p className="font-bold text-md">{getStatusLabel(video.status)}</p>
                        </span>

                        {userType === 'youtuber' && video.status === 'reviewPending' && (
                            <motion.div
                                whilehover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 250 }}
                            >
                                <Button
                                    onClick={() => {
                                        AsyncFetcher({
                                            url: '/generate-link/video/review',
                                            methodType: 'POST',
                                            bodyData: {
                                                name: channel.name,
                                                avatar: channel.avatar,
                                                userHandle: channel.userHandle,
                                                id: video.id,
                                                title: video.title,
                                                fileId: video.fileId,
                                                willUploadAt: video.uploadAt
                                            },
                                            cb: ({ data }) => {
                                                window.open(data.link, '_blank')
                                            }
                                        })
                                    }
                                    }
                                    className="bg-white text-black hover:bg-white/80 hover:text-black hover:cursor-pointer shadow-sm"
                                >
                                    Review
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </Link >
            </motion.div >
        </>
    );
}

export default VideoCard;
