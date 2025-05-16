import React from 'react'
import { EyeOff, ArrowLeft, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'

const PastLink = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full relative flex justify-center items-center h-screen bg-primary text-white overflow-hidden">

            <motion.div
                initial={{ x: "-100%", y: "-100%", rotate: -20 }}
                animate={{ x: "0%", y: "0%" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute top-0 left-0 w-[180%] h-[180%] bg-white/10 backdrop-blur-lg transform -rotate-12 pointer-events-none rounded-3xl"
            />

            <div className="relative z-10 text-center px-6 max-w-xl">

                <motion.div
                    initial={{ y: -60, opacity: 0, scale: 0.6 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="mb-6"
                >
                    <Lock className="w-16 h-16 text-white/80 mx-auto" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-4xl font-extrabold"
                >
                    This review is already closed 🔒
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="text-lg text-gray-200 mt-4 leading-relaxed"
                >
                    This video has already been <span className="text-green-400 font-semibold">approved</span> or <span className="text-red-400 font-semibold">rejected</span>.
                    <br />
                    There’s nothing more to do here.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 2.4, duration: 1.5 }}
                    className="mt-8 italic text-sm text-gray-300"
                >
                    “Actions speak louder than revisits.”
                </motion.div>

                <motion.button
                    onClick={() => navigate("/dashboard")}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.7 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-10 px-6 py-3 bg-white/10 border border-white/30 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 rounded-full flex items-center gap-2 text-white"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </motion.button>

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.5, type: "spring", stiffness: 120 }}
                    className="mt-10"
                >
                    <EyeOff className="w-6 h-6 text-white/50 mx-auto" />
                </motion.div>
            </div>
        </div>
    );
}

export default PastLink
