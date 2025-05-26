import { ChannelsProvider } from "./channels"
import { UserProvider } from "./user"
import { WorkSpaceProvider } from "./workspaces"
import { VideoProvider } from "./videos"

import React from 'react'

const ContextProvider = ({ children }) => {
    return (
        <ChannelsProvider>
            <UserProvider>
                <WorkSpaceProvider>
                    <VideoProvider>
                        {children}
                    </VideoProvider>
                </WorkSpaceProvider>
            </UserProvider>
        </ChannelsProvider>
    )
}

export default ContextProvider