import React, { useState } from 'react'
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameDay, isSameMonth } from 'date-fns';
import Cell from './Cell';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from 'lucide-react'
import VideoInfoSlider from './VideoInfoSlider';

const Calender = ({ videos }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [hoveredVideo, setHoveredVideo] = useState(null);

    const startDate = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 });
    const endDate = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });

    const videoUploadMap = new Map();
    videos.forEach(video => {
        if (video.uploadAt) {
            const date = new Date(video.uploadAt).toDateString();
            videoUploadMap.set(date, video);
        }
    });

    const generateCalendar = () => {
        const days = [];
        let day = startOfMonth(currentMonth);
        const lastDay = endOfMonth(currentMonth);

        while (day <= lastDay) {
            const dateStr = day.toDateString();
            const video = videoUploadMap.get(dateStr);

            days.push(
                <Cell
                    key={day}
                    day={day}
                    video={video}
                    isCurrentMonth={true}
                    isToday={isSameDay(day, new Date())}
                    setHoveredVideo={setHoveredVideo}
                />
            );

            day = addDays(day, 1);
        }

        return <div className="grid grid-cols-13 gap-y-3">{days}</div>;
    };


    return (
        <div className="w-full h-full">
            <div className="flex justify-center items-center mb-4 gap-x-4">
                <ArrowLeftCircleIcon onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} />
                <h2 className="text-xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
                <ArrowRightCircleIcon onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} />
            </div>
            {generateCalendar()}
            {hoveredVideo && <VideoInfoSlider video={hoveredVideo} />}
        </div>
    );
}

export default Calender
