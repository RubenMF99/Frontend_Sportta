import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AxiosClient from '../AxiosClient/AxiosClient';
const Sesion = ()=> {

    //State de usuario
    const [user,setUser] = useState({
        email:"",
        password:""
    });

    const {email,password} = user;
    //state de autenticacion
    const {setAuthUser} = useAuth();
    let navigate = useNavigate();
    const handleChange = e =>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        });
    }

    const handleSubmit = e =>{
        e.preventDefault();
        if([email,password].includes('')){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son obligatorios',
              });
            return;
        }
        //consultando a la API
        userExisted();
    }

    const userExisted = async () =>{
        try{
          
          const {data}= await AxiosClient.post(`/login`,user);
          localStorage.setItem('token',data.token);
          setAuthUser(data.user);
         if(data.user[0].id){
              navigate("/users");
            }
        }catch(error){
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El usuario o la contraseña no existen',
              });
        }
    }
    return (
        <div className='container'>
           <div className="row justify-content-center mt-5">
                <div className="col-auto">
                    <h2 className="title" >Iniciar Sesion</h2>
                </div>
           </div>
           <div className="row justify-content-center align-items-center">
                <div className="col-auto bg-light p-5">
                    <form 
                            onSubmit={handleSubmit}
                    >
                         <div className="row justify-content-center ">
                            <div className="col-md-7 m-4">
                                <input
                                    name="email"
                                    className="form-control "
                                    type="text"
                                    placeholder="email"
                                    value={email}
                                    onChange={handleChange}
                                />
                            </div>        
                                <div className="col-md-7  m-4">
                                    <input
                                        name="password"
                                        className="form-control"
                                        type="password"
                                        placeholder="Password"
                                        maxLength="10" 
                                        onChange={handleChange}
                                        value={password}
                                    />
                                </div>
                                <div className="col-md-7">
                                    <input
                                    type="submit"
                                    className="btn btn-primary btn-lg btn-block mb-3"
                                    value="Iniciar"
                                    />
                                    <Link to="/register" className=" mt-1 nav-link"> No tienes una cuenta? Registrate</Link>
                                </div>
                                
                        </div>
                    </form>
                </div>
           </div>
        </div>
    )
}

export default Sesion