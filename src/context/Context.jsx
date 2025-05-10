import { AccessTokenProvider } from "./acsTkn"
import { ChannelsProvider } from "./channels"
import { UserProvider } from "./user"

import React from 'react'

const ContextProvider = ({ children }) => {
    return (
        <AccessTokenProvider>
            <ChannelsProvider>
                <UserProvider>
                    {children}
                </UserProvider>
            </ChannelsProvider>
        </AccessTokenProvider>
    )
}

export default ContextProvider