import React, { useRef, useState } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider
} from '../components/ui/sidebar'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog'
import { LayoutDashboard, LogOut, Video, Settings, Star } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import logo from '/logo.png'
import { useEffect } from 'react'
import { fetchMe } from '../lib/FetchMe'
import { useUser } from "../context/user";
import { useAccessToken } from "../context/acsTkn";
import { AnimatePresence, motion } from 'framer-motion'
import { AsyncFetcher } from '../lib/Fetcher'

const Layout = () => {
  const [user, setUser] = useUser()
  const navigate = useNavigate()
  const [accessToken, setAccessToken] = useAccessToken()
  const currentPath = useLocation()
  const [open, setOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const buttonRef = useRef()
  useEffect(() => {
    !user.id && fetchMe(setUser, accessToken, setAccessToken)
  }, [])


  return (
    <div>
      <SidebarProvider>
        {/* Left */}
        <Sidebar className='w-[10vw] border-secondary'>
          <SidebarHeader className="bg-primary text-white border-b border-secondary pb-2 h-[7vh] flex justify-center">
            <div className="flex items-center gap-2 px-4 py-2">
              <img className="w-15 h-15" src={logo} />
              <span className="text-lg font-semibold">JOU</span>
            </div>
          </SidebarHeader>

          <SidebarContent className='bg-primary text-white flex justify-between overflow-clip'>
            <SidebarGroup>
              <SidebarGroupLabel className='text-white mb-3'>OVERVIEW</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {
                    user.userType == 'editor' &&
                    <Link to='/upload'>
                      <SidebarMenuItem>
                        <SidebarMenuButton isActive={currentPath.pathname == '/upload'}>
                          <Video className="h-4 w-4" />
                          <span>Upload</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </Link>
                  }

                  <Link to='/dashboard'>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive={currentPath.pathname == '/dashboard'}>
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Dashboard</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </Link>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <AnimatePresence>
              {
                open &&
                (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <SidebarGroup className='border-t border-secondary transition-all duration-200'>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          <SidebarMenuItem>
                            <SidebarMenuButton
                              className='hover:bg-primary hover:text-white hover:cursor-pointer active:bg-primary active:text-white'>
                              <div className='flex items-center gap-x-2' onClick={_ => setConfirmLogout(true)}>
                                <LogOut className="h-4 w-4" />
                                <span className='text-red-500'>Logout</span>
                              </div>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  </motion.div>
                )
              }
            </AnimatePresence>
          </SidebarContent>

          <SidebarFooter className="border-t border-secondary hover:bg-primary pt-2 bg-primary text-white">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className='hover:bg-primary hover:text-white py-5 active:bg-primary active:text-white'>
                  <div
                    ref={buttonRef}
                    onClick={() => setOpen(!open)}
                    className='flex gap-x-2 items-center'
                  >
                    <span className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg cursor-pointer">H</span>
                    <span className='text-md font-semibold hover:cursor-pointer'>{user.name?.length > 16 ? `${user.name?.slice(0, 12)}...` : user.name}</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>

      {/* Logout Confirmation Dialog */}
      <Dialog open={confirmLogout} onOpenChange={setConfirmLogout}>
        <DialogContent className='bg-primary border-secondary'>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to log out?</p>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setConfirmLogout(false)} className='text-black'>
              Cancel
            </Button>
            <Button variant="destructive" onClick={_ => AsyncFetcher({
              url: '/logout',
              cb: _ => { setConfirmLogout(false); navigate('/login') }
            })}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      {/* Content */}
      < div className='fixed top-0 left-[10vw] w-[90vw] h-screen grid place-items-center' >
        <Outlet />
      </div >
    </div >
  )
}

export default Layout

const notifications = [
  {
    id: 1,
    message: "Your video 'React Hooks Deep Dive' was approved.",
    type: "Video Approved",
    date: "2025-05-07 09:30 AM",
  },
  {
    id: 21,
    message: "New comment on 'Web3 Smart Contracts Explained'.",
    type: "Comment",
    date: "2025-05-06 05:12 PM",
  },
  {
    id: 3,
    message: "Your subscription is about to expire.",
    type: "Subscription",
    date: "2025-05-05 11:00 AM",
  },
  {
    id: 2,
    message: "New comment on 'Web3 Smart Contracts Explained'.",
    type: "Comment",
    date: "2025-05-06 05:12 PM",
  },
  {
    id: 39,
    message: "Your subscription is about to expire.",
    type: "Subscription",
    date: "2025-05-05 11:00 AM",
  },
  {
    id: 62,
    message: "New comment on 'Web3 Smart Contracts Explained'.",
    type: "Comment",
    date: "2025-05-06 05:12 PM",
  },
  {
    id: 34,
    message: "Your subscription is about to expire.",
    type: "Subscription",
    date: "2025-05-05 11:00 AM",
  },
];
