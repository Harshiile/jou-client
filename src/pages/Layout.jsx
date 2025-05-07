import React, { useState } from 'react'
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../components/ui/dropdown-menu'
import { LayoutDashboard, Youtube, Bell, Video, Settings } from 'lucide-react'
import { Avatar, AvatarImage } from '../components/ui/avatar'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const Layout = () => {
  const currentPath = useLocation()

  return (
    <div>
      <SidebarProvider>
        {/* Left */}
        <Sidebar className='w-[10vw] border-secondary'>
          <SidebarHeader className="bg-primary text-white border-b border-secondary pb-2 h-[7vh] flex justify-center">
            <div className="flex items-center gap-2 px-4 py-2">
              <Youtube className="h-6 w-6 text-red-500" />
              <span className="text-lg font-semibold">JOU</span>
            </div>
          </SidebarHeader>

          <SidebarContent className='bg-primary text-white'>
            <SidebarGroup>
              <SidebarGroupLabel className='text-white mb-3'>OVERVIEW</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <Link to='/upload'>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive={currentPath.pathname == '/upload'}>
                        <Video className="h-4 w-4" />
                        <span>Upload</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </Link>
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

          </SidebarContent>
          <SidebarFooter className="border-t border-secondary pt-2 bg-primary text-white">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>

      {/* Right - Upper*/}
      <div className='w-[90vw] h-[7vh] flex items-center justify-end fixed top-0 left-[10vw] bg-primary border-b border-secondary text-white'>
        <div className='flex items-center gap-x-6 pr-10'>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Bell className='w-6 h-6 cursor-pointer text-white transition' />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-80 h-100 bg-primary text-[#e3e3e3] border-secondary shadow-lg -translate-x-30 scroll-auto">
              <DropdownMenuLabel className="text-lg font-semibold text-white">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-secondary" />

              <DropdownMenuGroup>
                {notifications.map((notif, index) => (
                  <div key={notif.id} className="px-2 py-2">
                    <p className="text-sm font-medium text-white">{notif.type}</p>
                    <p className="text-sm text-[#d4d4d8]">{notif.message}</p>
                    <p className="text-xs text-[#71717a] mt-1">{notif.date}</p>

                    {index !== notifications.length - 1 && (
                      <DropdownMenuSeparator className="bg-secondary my-2" />
                    )}
                  </div>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Avatar */}
          <Avatar className='w-10 h-10 border border-white cursor-pointer'>
            <AvatarImage src='https://avatars.githubusercontent.com/u/140196543?v=4' />
          </Avatar>
        </div>
      </div>


      {/* Content */}
      <div className='fixed top-[7vh] left-[10vw] w-[90vw] h-[93vh] grid place-items-center'>
        <Outlet />
      </div>
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
