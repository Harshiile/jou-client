import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App, Dashboard, Layout, Login, Upload } from '../src/pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChannelsProvider, AccessTokenProvider } from './context'
import { Toaster } from "./components/ui/sonner"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AccessTokenProvider>
        <ChannelsProvider>
          <Routes>
            <Route path='' element={<App />} />
            <Route path='login' element={<Login />} />
            <Route path='/' element={<Layout />}>
              <Route path='upload' element={<Upload />} />
              <Route path='dashboard' element={<Dashboard />} />
            </Route>
          </Routes>
        </ChannelsProvider>
      </AccessTokenProvider>
      <Toaster />
    </BrowserRouter>
  </StrictMode>,
)
