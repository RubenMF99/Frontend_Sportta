import {BrowserRouter,Routes,Route} from 'react-router-dom';

//Importando Componentes
import Sesion from './components/login/Sesion';
import Register from './components/login/Register';
import Listusers from './components/Listusers/Listusers';

//Context de autenticacion
import {AuthProvider} from './context/Auth';
//Ruta protegida
import RouteProtected from './layout/RouteProtected';

function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
       <Routes>
           <Route path="/" element={<Sesion/>}></Route>
           <Route path="/register" element={<Register/>}></Route>
          <Route path="/users" element={<RouteProtected/>}>
             < Route index element={<Listusers/>}/>
          </Route>
       </Routes>
     </AuthProvider>
  </BrowserRouter>
  )
}

export default App
