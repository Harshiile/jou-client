import React from 'react';
import VideoCard from './VideoCard'; // Assuming you extracted your card into this component

const PendingReviewVideos = ({ pendingVideos, userType, channel }) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {pendingVideos?.length > 0 ? (
                pendingVideos?.map(video => (
                    <VideoCard
                        key={video.id}
                        video={video}
                        userType={userType}
                        forUse={0}
                        channel={channel}
                    />
                ))
            ) : (
                <div className="text-muted-foreground text-center col-span-full">No pending videos</div>
            )}
        </div>
    );
};

export default PendingReviewVideos;
