import { createRoot } from 'react-dom/client'
import './index.css'
import { Home, Dashboard, Info, JoinWS, Layout, Login, Upload, ReviewLink, Authorize } from '../src/pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ContextProvider from './context/Context'
import { Toaster } from "./components/ui/sonner"
import { AuthMiddleWare } from './middleware/auth'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ContextProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/get/youtube/info' element={
          <AuthMiddleWare>
            <Info />
          </AuthMiddleWare>}
        />
        <Route path='/login' element={<Login />} />
        <Route path='/authorize-editor/:link' element={<Authorize />} />
        <Route path='/join/workspace/:linkParams' element={
          <AuthMiddleWare>
            <JoinWS />
          </AuthMiddleWare>}
        />
        <Route path='/' element={
          <AuthMiddleWare>
            <Layout />
          </AuthMiddleWare>
        }>
          <Route path='upload' element={
            <AuthMiddleWare>
              <Upload />
            </AuthMiddleWare>
          } />
          <Route path='dashboard' element={
            <AuthMiddleWare>
              <Dashboard />
            </AuthMiddleWare>
          } />
          <Route path='review/:link' element={
            <AuthMiddleWare>
              <ReviewLink />
            </AuthMiddleWare>
          } />
        </Route>
      </Routes>
    </ContextProvider>
    <Toaster richColors />
  </BrowserRouter>
)




/*
Login --
Info --
Authorize --
JoinWS --
Layout --
Upload --
Dashboard --

Review
Home
*/