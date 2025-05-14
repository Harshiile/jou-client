import { Navigate } from 'react-router-dom';
import { useAccessToken } from '../context/acsTkn'

export const AuthMiddleWare = ({ children }) => {
    const [accessToken] = useAccessToken();
    return accessToken ? children : <Navigate to='/login' />
}