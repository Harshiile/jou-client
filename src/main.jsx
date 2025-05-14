import { createRoot } from 'react-dom/client'
import './index.css'
import { App, Dashboard, Info, JoinWS, Layout, Login, Upload } from '../src/pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ContextProvider from './context/Context'
import { Toaster } from "sonner"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ContextProvider>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/get/youtube/info' element={<Info />} />
        <Route path='/login' element={<Login />} />
        <Route path='/join/workspace/:linkParams' element={<JoinWS />} />
        <Route path='/' element={<Layout />}>
          <Route path='upload' element={<Upload />} />
          <Route path='dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </ContextProvider>
    <Toaster richColors position="bottom-right" />
  </BrowserRouter>
)
