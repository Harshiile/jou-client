import { Navigate } from 'react-router-dom';
import { useUser } from '../context/user'

export const AuthMiddleWare = ({ children }) => {
    const [user] = useUser();
    return children
    // return user.id ? children : <Navigate to='/login' />
}