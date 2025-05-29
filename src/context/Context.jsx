import { ChannelsProvider } from "./channels"
import { UserProvider } from "./user"
import { WorkSpaceProvider } from "./workspaces"
import { VideoProvider } from "./videos"
import { NoAuthProvider } from './noAuth'

import React from 'react'

const ContextProvider = ({ children }) => {
    return (
        <NoAuthProvider>
            <ChannelsProvider>
                <UserProvider>
                    <WorkSpaceProvider>
                        <VideoProvider>
                            {children}
                        </VideoProvider>
                    </WorkSpaceProvider>
                </UserProvider>
            </ChannelsProvider>
        </NoAuthProvider>
    )
}

export default ContextProvider