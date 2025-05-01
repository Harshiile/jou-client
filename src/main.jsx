import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App, GetYTInfo } from '../src/pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChannelsProvider } from './context/channels'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ChannelsProvider>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/get/youtube/info' element={<GetYTInfo />} />
        </Routes>
      </ChannelsProvider>
    </BrowserRouter>
  </StrictMode>,
)
