import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Users, Building2, Calendar, Tag } from 'lucide-react';
import Loader from '../../components/loader';
import { toast } from 'sonner';
import { AsyncFetcher } from '../../lib/Fetcher';

const Authorize = () => {
    const [data, setData] = useState(null);
    const searchParams = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        AsyncFetcher({
            url: `/workspace/join/final/${searchParams.link}`,
            cb: ({ data }) => {
                console.log(data);
                setData(data?.decryptedData?.data)
            },
        });
    }, []);

    const handleAuthorize = (approve) => {
        AsyncFetcher({
            url: `/service/editor-join/workspace?id=${data.editorId}&workspaceId=${data.wsId}&approve=${approve}`,
            methodType: 'POST',
            body: { workspaceId: data.wsId },
            cb: ({ message }) => {
                toast.success(message);
                navigate('/dashboard');
            }
        });
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    if (!data) return <Loader />;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex items-center justify-center p-4"
        >
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="w-[80vw] mx-auto mt-10 bg-secondary shadow-xl rounded-xl overflow-hidden text-white"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
            >
                <div className="relative">
                    <motion.div
                        className="h-24 bg-gradient-to-r from-primary to-white/70"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />

                    <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-24"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="relative w-24 h-24 rounded-full border-4 border-white bg-white">
                            <motion.img
                                src={data.wsAvatar}
                                alt="Workspace Avatar"
                                className="w-full h-full object-cover rounded-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            />
                        </div>
                    </motion.div>
                </div>

                <div className="px-6 md:px-16 lg:px-64 pt-16 pb-8 text-center text-dull">
                    <motion.h1
                        variants={itemVariants}
                        className="text-2xl font-bold mb-1 text-dull"
                    >
                        {data.wsName}
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-dull font-medium mb-3"
                    >
                        {data.wsUserHandle}
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="border-t border-gray-700/30 my-6 pt-6"
                    >
                        <h2 className="text-xl font-semibold text-dull mb-3">Authorize Editor</h2>
                        <p className="text-dull mb-2">{data.editorName}</p>
                        <p className="text-dull text-sm mb-6">{data.editorMail}</p>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="flex justify-center gap-4 mt-6"
                    >
                        <motion.button
                            onClick={() => handleAuthorize(true)}
                            className="bg-primary text-white px-8 py-3 rounded-lg font-medium"
                            whileHover={{ scale: 1.05, backgroundColor: 'white', color: 'black', cursor: 'pointer' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Authorize
                        </motion.button>
                        <motion.button
                            onClick={() => handleAuthorize(false)}
                            className="bg-white text-black text-dull px-8 py-3 rounded-lg font-medium"
                            whileHover={{ scale: 1.05, backgroundColor: 'red', color: 'white', cursor: 'pointer' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Decline
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Authorize;