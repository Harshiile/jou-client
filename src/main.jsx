import { createRoot } from 'react-dom/client'
import './index.css'
import { App, Dashboard, Info, JoinWS, Layout, Login, Review, Upload } from '../src/pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ContextProvider from './context/Context'
import { Toaster } from "sonner"
import { AuthMiddleWare } from './middleware/auth'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ContextProvider>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/get/youtube/info' element={
          <AuthMiddleWare>
            <Info />
          </AuthMiddleWare>}
        />
        <Route path='/login' element={<Login />} />
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
          <Route path='review' element={
            <AuthMiddleWare>
              <Review />
            </AuthMiddleWare>
          } />
        </Route>
      </Routes>
    </ContextProvider>
    <Toaster richColors position="bottom-right" />
  </BrowserRouter>
)
