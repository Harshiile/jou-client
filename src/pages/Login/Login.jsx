import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { toast } from "sonner";
import logo from '/logo.png';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { AsyncFetcher } from '../../lib/Fetcher';
import { AnimatePresence, motion } from 'framer-motion';
import { useUser } from '../../context/user';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [_, setUser] = useUser();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='w-[25vw] px-6 py-8 border border-[#27272a] rounded-xl bg-[#09090b] text-white shadow-2xl'
        >
            <div className='w-full flex flex-col gap-y-6'>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className='text-2xl font-bold text-center'
                >
                    {isLogin ? 'Log In' : 'Sign Up'}
                </motion.p>

                {/* Email */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className='flex flex-col items-start gap-y-2'
                >
                    <Label htmlFor='email' className='text-md'>Email</Label>
                    <Input
                        id='email'
                        className='border border-[#27272a] bg-transparent text-md focus-visible:ring-1 focus-visible:ring-blue-500 transition'
                        placeholder='example@gmail.com'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </motion.div>

                {/* Name */}
                <AnimatePresence>
                    {!isLogin && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className='flex flex-col items-start gap-y-2 overflow-hidden'
                        >
                            <Label htmlFor='name' className='text-md'>Name</Label>
                            <Input
                                id='name'
                                className='border border-[#27272a] bg-transparent text-md focus-visible:ring-1 focus-visible:ring-blue-500 transition'
                                placeholder='John Doe'
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Password */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className='flex flex-col items-start gap-y-2'
                >
                    <Label htmlFor='password' className='text-md'>Password</Label>
                    <Input
                        id='password'
                        type="password"
                        className='border border-[#27272a] bg-transparent text-md focus-visible:ring-1 focus-visible:ring-blue-500 transition'
                        placeholder='••••••••••'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </motion.div>

                {/* Role (Signup only) */}
                <AnimatePresence>
                    {!isLogin && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className='flex flex-col gap-y-2 overflow-hidden'
                        >
                            <Label className='text-md'>Role</Label>
                            <Select onValueChange={value => setRole(value)}>
                                <SelectTrigger className="w-full border border-[#27272a] bg-transparent">
                                    <SelectValue placeholder="Role" />
                                </SelectTrigger>
                                <SelectContent className='bg-[#09090b] text-[#e3e3e3]'>
                                    <SelectItem value="youtuber" className='hover:font-bold'>Youtuber</SelectItem>
                                    <SelectItem value="editor" className='hover:font-bold'>Editor</SelectItem>
                                </SelectContent>
                            </Select>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Button
                        variant="default"
                        className='w-full bg-white text-primary hover:bg-[#ffffffc7] font-medium text-md mt-2 transition'
                        onClick={() => {
                            if (!email) return toast.error('Email is required');
                            if (!password) return toast.error('Password is required');
                            if (!isLogin && !name) return toast.error('Name is required');
                            if (!isLogin && !role) return toast.error('Role is required');

                            AsyncFetcher({
                                url: isLogin ? '/login' : '/signup',
                                methodType: 'POST',
                                bodyData: isLogin
                                    ? { email, password }
                                    : { email, password, userType: role, name },
                                cb: ({ message, data }) => {
                                    setUser(data.userData);
                                    toast.success(message);
                                    navigate('/upload');
                                },
                            });
                        }}
                    >
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </Button>
                </motion.div>

                {/* Toggle link */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className='flex gap-x-2 text-sm mx-auto'
                >
                    <p>{isLogin ? 'Not have an account?' : 'Already have an account?'}</p>
                    <p
                        onClick={() => setIsLogin(!isLogin)}
                        className='cursor-pointer text-[#3b82f6] hover:underline transition'
                    >
                        {isLogin ? 'Sign up' : 'Log in'}
                    </p>
                </motion.div>
            </div>

            {/* Logo */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className='mt-6'
            >
                <img src={logo} alt="JustOneUpload" className='mx-auto w-20 h-20 object-contain' />
            </motion.div>
        </motion.div>
    );
};

export default Login;
