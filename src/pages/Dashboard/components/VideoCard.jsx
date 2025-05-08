import { Clock, Eye } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'


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
            return "bg-green-500/20 text-green-500"
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


const VideoCard = ({ video, userType, forUse }) => {
    /*
        id
        url
        status
        thumbnail
        title
        duration
        videoType
        views
        date
        channel {name, userHandle}
    */
    return (
        <Link
            key={video?.id}
            to={video?.url}
            onClick={e => video?.status !== 'uploaded' && e.preventDefault()}
            className={`flex items-center justify-between rounded-lg overflow-hidden bg-primary shadow-sm transition-shadow hover:shadow-lg text-white cursor-auto ${forUse == 0 && 'p-3'}`}
        >
            {/* Left Section */}
            <div className="flex items-start gap-x-4 flex-1">
                <div className="relative h-[80px] w-[140px] flex-shrink-0 overflow-hidden rounded-md bg-muted">
                    <img
                        src={video?.thumbnail || "/placeholder.svg"}
                        alt={video?.title}
                        className="h-full w-full object-cover"
                    />
                    {video?.duration && (
                        <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                            {video?.duration}
                        </span>
                    )}
                </div>

                <div className="flex flex-col justify-between flex-1 gap-y-1">

                    {/* Video Title & Type */}
                    <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold line-clamp-2">{video?.title}</h3>
                        {video?.videoType && (
                            <span className={`text-xs font-bold rounded px-2 py-0.5 ${getTypeBadgeStyle(video?.videoType)}`}>
                                {video?.videoType.toUpperCase()}
                            </span>
                        )}
                    </div>

                    {/* Channel Avatar & Handle */}
                    {
                        (forUse == 0 && userType == 'editor') &&
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            {userType === "editor" && video.channel && (
                                <div className="flex items-center gap-x-2 text-sm">
                                    <img
                                        src={video.channel.avatar || "/placeholder.svg"}
                                        alt={video.channel.handle}
                                        className="w-5 h-5 rounded-full"
                                    />
                                    <span>{video.channel.handle}</span>
                                </div>
                            )}
                        </div>
                    }

                    {/* Views + Published date */}
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Eye className="h-3.5 w-3.5" />
                            <span>{video?.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{video?.date}</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Right Status Badge */}
            <div>
                <span
                    className={`text-xs rounded-md px-3 py-1 flex items-center gap-x-2 ${getStatusBadgeStyle(video?.status)}`}
                >
                    <Clock className="w-4 h-4" />
                    <p className="font-bold text-md">{getStatusLabel(video?.status)}</p>
                </span>
            </div>
        </Link>
    )
}

export default VideoCard