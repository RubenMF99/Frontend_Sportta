import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AxiosClient from '../AxiosClient/AxiosClient';
const Register = ()=> {
    //state de registro
    const [registrarU,setregistrar] = useState({
        name:"",
        cell:"",
        email:"",
        password:"",
        repeatPassword:""
    });
    const {name,cell,email,password,repeatPassword} = registrarU;

    const handleChange = e =>{
        setregistrar({
            ...registrarU,
            [e.target.name]:e.target.value
        });
    }

    const handleSubmitForm = e =>{
        e.preventDefault();
        if([name,cell,email,password].includes('')){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son obligatorios',
              });
            return;
        }
        if(password !== repeatPassword){
            Swal.fire({
                icon: 'alert',
                title: 'Oops...',
                text: 'Las contraseñas deben ser iguales',
              });
            return;
        }
       register_user();
        //reseteamos el forma
        setregistrar({
            name:"",
            cell:"",
            email:"",
            password:"",
            repeatPassword:""
        });
    }

    const register_user = async () => {
        try{
        const response = await AxiosClient.post('/register',registrarU);
        Swal.fire({
            icon: 'success',
            text: 'Registro exitoso',
          });
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div>
             <div className='container'>
           <div className="row justify-content-center mt-5">
                <div className="col-auto">
                    <h2 className="title" >Registrarse</h2>
                </div>
           </div>
                    <form
                        onSubmit={handleSubmitForm}
                    >
                         <div className="row justify-content-center ">
                            <div className="col-md-7 m-4">
                                <input
                                    name="name"
                                    className="form-control "
                                    type="text"
                                    placeholder="nombre"
                                    value={name}
                                    onChange={handleChange}
                                />
                            </div>       
                            <div className="col-md-7 m-4">
                                <input
                                    name="cell"
                                    className="form-control "
                                    type="number"
                                    placeholder="telefono"
                                    value={cell}
                                    onChange={handleChange}
                                />
                            </div>     
                            <div className="col-md-7  m-4">
                                    <input
                                        name="email"
                                        className="form-control"
                                        type="email"
                                        placeholder="Email" 
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
                                        value={password}
                                        maxLength="10" 
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-7  m-4">
                                    <input
                                        name="repeatPassword"
                                        className="form-control"
                                        type="password"
                                        placeholder="Repetir password"
                                        maxLength="10" 
                                        value={repeatPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-7 clearfix">
                                    <input
                                    type="submit"
                                    className="btn btn-primary btn-lg btn-block  "
                                    value="Registrarse"
                                    />
                                    <Link to="/" className=" m-lg-5 btn btn-success btn-lg btn-block ">Volver</Link>
                                </div>
                                
                        </div>
                    </form>
                </div>
        </div>
    )
}

export default Register