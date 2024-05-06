import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PrivateRoutes = ({children}) => {
    const {user} = useAuth()
  
    return(
        user?.email ?  children : <Navigate to="/"/>
    )
}

export default PrivateRoutes