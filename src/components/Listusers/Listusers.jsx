import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import AxiosClient from '../AxiosClient/AxiosClient';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import User from './User';

const Listusers = () => {
  const [users,setUsers] = useState([]);    
    const {idControl} = useAuth();
    let navigate = useNavigate();
  
    useEffect(()=>{
        const Listusers =async ()=>{
             const token = localStorage.getItem('token');
                if(!token) return;
                const config = {
                    headers:{"Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                    }
                }
                try{
                    const {data} = await AxiosClient.get('/users',config);
                    setUsers(data.users);
                }catch(error){
                    console.log(error);
                }
    }
    Listusers();
    },[]);
  return (
    <div className="container">
    <div className="row">
            <div className="col-2 mt-3 ms-auto">
                <button className="btn btn-success">Cerrar Sesion</button>
            </div>
    </div>
   <div className="row justify-content-center mt-5">
       <div className="col-auto">
         <h2>Tus Usuarios</h2>
       </div>
       
   </div>
   <div className="row justify-content-center mt-5">
       <div className="col-8">
       <table className="table table-responsive">
           <tbody>
                {users?.map(user => (
                    <User user={user} key={user.id}/>   
                ) )}
            </tbody>
        </table>
       </div>
    </div>
    
</div>
  )
}

export default Listusers