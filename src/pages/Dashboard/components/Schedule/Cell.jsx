import React, { useState } from 'react'
import { format } from 'date-fns';

const Cell = ({ day, video, isCurrentMonth, isToday, setHoveredVideo }) => {
    const baseClasses = `relative border rounded-lg w-9 h-9 text-sm transition-all duration-200 cursor-default grid place-items-center my-1
    ${isCurrentMonth ? 'text-white' : 'text-gray-400'}
    ${isToday && 'bg-[#5c5cbc]'}
    ${video && 'bg-green-600 text-black hover:shadow-xl'}
  `;

    return (
        <div
            className={baseClasses}
            onMouseEnter={() => video && setHoveredVideo(video)}
            onMouseLeave={() => setHoveredVideo(null)}
        >
            <div className="font-semibold">{format(day, 'd')}</div>
        </div>
    );
}

export default Cell
