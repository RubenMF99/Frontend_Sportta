import {Outlet,Navigate} from 'react-router-dom'
import  useAuth from '../hooks/useAuth';

const  RouteProtected = ()=> {
    const {authUser,loading} = useAuth();
    const id = localStorage.getItem('id');
    if(loading) return("Loading");
    return (
        <>
            {id ?<Outlet/>:<Navigate to="/"/>}
        </>
    )
}

export default RouteProtected