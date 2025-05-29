'use client'

import { motion } from 'framer-motion';

const index = () => {
    return (
        <main className="bg-black text-white min-h-screen py-16 font-sans px-16 ">
            <section className=" mx-auto grid md:grid-cols-2 gap-10 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <img src="/logo.png" alt="JOU Logo" width={50} height={50} />
                        <h1 className="text-3xl font-bold">JustOneUpload</h1>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                        Edit. Approve. Upload. <br /> All from one place.
                    </h2>
                    <p className="text-lg text-gray-300 mb-8">
                        JOU saves creators from unnecessary upload/download headaches. Editors upload once. YouTubers review & publish — with zero bandwidth waste.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="bg-white text-black font-medium py-3 px-6 rounded-lg transition-colors hover:bg-gray-300"
                    >
                        Get Started
                    </motion.button>
                </motion.div>

                {/* Right Content */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                >
                    <motion.div
                        className="w-full h-[350px] bg-gradient-to-br from-gray-800 to-black rounded-2xl p-6 border border-gray-700 shadow-2xl"
                        whileHover={{ scale: 1.02 }}
                    >
                        <h3 className="text-xl font-semibold mb-2">Upload Timeline</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Track videos from editing to final upload with full visibility and zero re-uploads.
                        </p>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li>✔️ Editor uploads once</li>
                            <li>✔️ Youtuber reviews & approves</li>
                            <li>✔️ Direct YouTube scheduling</li>
                        </ul>
                    </motion.div>
                </motion.div>
            </section>

            {/* Features Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                transition={{ staggerChildren: 0.2 }}
                className="mt-28 max-w-6xl mx-auto"
            >
                <h2 className="text-3xl font-bold mb-8 text-center">Why JustOneUpload?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feat, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.5 }}
                            className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:shadow-xl transition"
                        >
                            <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
                            <p className="text-gray-400">{feat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Footer */}
            <footer className="mt-28 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} JustOneUpload — Built for creators, by creators.</p>
            </footer>
        </main>
    );
}
export default index;
const features = [
    {
        title: "Save 10GB+ of Bandwidth",
        desc: "No double uploading/downloading of video files. Editors upload directly. Creators only approve.",
    },
    {
        title: "Full Scheduling Control",
        desc: "Creators can schedule YouTube uploads in one click — no need to download anything.",
    },
    {
        title: "Secure & OAuth Verified",
        desc: "All accounts and uploads are handled through official OAuth and YouTube APIs securely.",
    },
];
