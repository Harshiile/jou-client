import React, { useState } from 'react';
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { toast } from "sonner"
import logo from '/logo.png'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { AsyncFetcher } from '../../lib/Fetcher';
import { AnimatePresence, motion } from 'framer-motion';
import { useUser } from '../../context/user';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(true)
    const [_, setUser] = useUser()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    return <>
        <div className='w-[25vw] px-4 border border-[#27272a] rounded-xl'>
            <div className='w-full flex flex-col gap-y-6 pt-6'>
                <p className='text-2xl font-bold'>
                    {isLogin ? 'Log In' : 'Sign Up'}
                </p>
                <div className='flex flex-col items-start'>
                    <Label htmlFor='email' className='mb-2 text-md' >Email</Label>
                    <Input
                        id='email'
                        className='border border-[#27272a] text-md'
                        placeholder='example@gmail.com'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <AnimatePresence>
                    {
                        !isLogin &&
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                            <Label htmlFor='name' className='mb-2 text-md' >Name</Label>
                            <Input
                                id='name'
                                className='border border-[#27272a] text-md'
                                placeholder='John Doe'
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </motion.div>
                    }
                </AnimatePresence>
                <div className='flex flex-col items-start'>
                    <Label htmlFor='password' className='mb-2 text-md' >Password</Label>
                    <Input
                        id='password'
                        className='border border-[#27272a] text-md'
                        placeholder='••••••••••'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <AnimatePresence>
                    {
                        !isLogin &&
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                            <Label className='mb-2 text-md' >Role</Label>
                            <Select onValueChange={value => setRole(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Role" />
                                </SelectTrigger>
                                <SelectContent className='bg-[#09090b] text-[#e3e3e3]'>
                                    <SelectItem value="youtuber" className='bg-[#09090b] text-[#e3e3e3]'>Youtuber</SelectItem>
                                    <SelectItem value="editor" className='bg-[#09090b] text-[#e3e3e3]'>Editor</SelectItem>
                                </SelectContent>
                            </Select>
                        </motion.div>
                    }
                </AnimatePresence>
                <Button variant="default" className='bg-white text-primary hover:bg-[#ffffffc7] text-md cursor-pointer' onClick={() => {
                    if (!email) { toast.error('Email is required'); return; }
                    if (!password) { toast.error('Password is required'); return; }
                    if (!isLogin && !role) { toast.error('Role is required'); return; }
                    if (!isLogin && !name) { toast.error('Name is required'); return; }

                    AsyncFetcher({
                        url: isLogin ? '/login' : '/signup',
                        methodType: 'POST',
                        bodyData: isLogin ? { email, password } : { email, password, userType: role, name },
                        cb: ({ message, data }) => {
                            setUser(data.userData);
                            toast.success(message);
                            navigate('/upload')
                        }
                    })

                }}>
                    {!isLogin ? 'Sign up' : 'Log in'}
                </Button>
                <div className='flex gap-x-2 text-sm mx-auto'>
                    <p>
                        {isLogin ? 'Not have an account?' : 'Already have an account?'}
                    </p>
                    <p onClick={_ => setIsLogin(!isLogin)} className='cursor-pointer text-[#3b82f6] hover:underline transition'>
                        {isLogin ? 'Sign up' : 'Log in'}
                    </p>
                </div>
            </div>
            <div>
                <img src={logo} className='mx-auto w-25 h-25' />
            </div>
        </div >
    </>
};
export default Login;