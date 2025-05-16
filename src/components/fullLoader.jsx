import React from 'react'
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const FullLoader = () => {
    return (
        <div className="w-full relative flex justify-center items-center h-screen bg-primary text-white overflow-hidden">

            {/* Diagonal glass overlay sliding in */}
            <motion.div
                initial={{ x: "-100%", y: "-100%", rotate: -20 }}
                animate={{ x: "0%", y: "0%" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute top-0 left-0 w-[180%] h-[180%] bg-white/10 backdrop-blur-lg transform -rotate-12 pointer-events-none rounded-3xl"
            />

            {/* Foreground content container */}
            <div className="relative z-10 text-center px-6 max-w-xl">

                {/* Loader icon with scale and fade */}
                <motion.div
                    initial={{ y: -60, opacity: 0, scale: 0.6 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="mb-6"
                >
                    <Loader2 className="w-16 h-16 text-white/80 mx-auto animate-spin" />
                </motion.div>

                {/* Main heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-4xl font-extrabold"
                >
                    Loading, please wait...
                </motion.h1>

                {/* Supporting text */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="text-lg text-gray-200 mt-4 leading-relaxed"
                >
                    We're preparing everything for you.
                </motion.p>

                {/* Optional subtle quote or message */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 2.4, duration: 1.5 }}
                    className="mt-8 italic text-sm text-gray-300"
                >
                    “Patience is a key element of success.”
                </motion.div>

                {/* Optional Retry button example */}
                {/*
          <motion.button
            onClick={() => window.location.reload()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 px-6 py-3 bg-white/10 border border-white/30 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 rounded-full flex items-center gap-2 text-white"
          >
            Retry
          </motion.button>
          */}

                {/* Decorative icon at bottom */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.5, type: "spring", stiffness: 120 }}
                    className="mt-10"
                >
                    <Loader2 className="w-6 h-6 text-white/50 mx-auto animate-pulse" />
                </motion.div>

            </div>
        </div>
    )
}

export default FullLoader