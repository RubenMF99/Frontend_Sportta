import React,{useState,useEffect,createContext} from 'react'
import AxiosClient from '../components/AxiosClient/AxiosClient';
const AuthContext = createContext();

const AuthProvider = ({children})=> {

    //state de autententicacion
    const [authUser,setAuthUser] = useState({});
    const [loading,setLoading] = useState(true);
    const [idControl,setidControl] = useState(null);

    useEffect(()=>{
        const autenticarUser = async ()=>{
            const token = localStorage.getItem('token');
            if(!token){
                setLoading(false);
                return;  
            } 

            const config = {
                headers:{"Content-Type":"application/json",
                Authorization:`Bearer ${token}`
                }
            }
            try{
               // const response = await AxiosClient.get('/profile',config);
                //setAuthUser(response.data);
            }catch(error){
                setAuthUser({});
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        autenticarUser();
    },[]);
    return (
        <AuthContext.Provider
            value={{
                authUser,
                loading,
                idControl,
                setidControl,
                setAuthUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export{
    AuthProvider
}

export default AuthContext
