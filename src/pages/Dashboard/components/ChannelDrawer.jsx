"use client"

import { Clock, Eye, Video } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer"
import { Separator } from "@/components/ui/separator"


export function ChannelDrawer({ channel, open, onOpenChange }) {
    if (!channel) return null

    return (
        <Drawer open={open} onOpenChange={onOpenChange} direction="right">
            <DrawerContent className="h-[80vh] max-w-[500px] sm:max-w-[600px] border-l border-border/40">
                <DrawerHeader className="border-b border-border/40 px-6 py-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={channel.avatar || "/placeholder.svg"} alt={channel.name} />
                            <AvatarFallback>{channel.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-xl font-bold">{channel.name}</h2>
                            <p className="text-sm text-muted-foreground">{channel.handle} • {channel.subscribers} subscribers</p>
                        </div>
                    </div>
                </DrawerHeader>
                <div className="overflow-auto p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Channel Videos</h3>
                        <Badge variant="outline" className="font-normal">
                            {channel.videos.length} videos
                        </Badge>
                    </div>
                    <div className="space-y-4">
                        {channel.videos.map((video) => (
                            <div key={video.id} className="rounded-lg border border-border/40 overflow-hidden">
                                <div className="flex gap-4 p-4">
                                    <div className="h-[90px] w-[160px] flex-shrink-0 overflow-hidden rounded-md bg-muted">
                                        <img
                                            src={video.thumbnail || "/placeholder.svg"}
                                            alt={video.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div>
                                            <h4 className="font-medium line-clamp-2">{video.title}</h4>
                                            <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Eye className="h-3.5 w-3.5" />
                                                    <span>{video.views}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-3.5 w-3.5" />
                                                    <span>{video.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <Badge
                                                variant={
                                                    video.status === "Published" ? "default" :
                                                        video.status === "Processing" ? "secondary" :
                                                            video.status === "Pending" ? "outline" :
                                                                video.status === "Scheduled" ? "outline" :
                                                                    "destructive"
                                                }
                                                className="font-normal"
                                            >
                                                {video.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
