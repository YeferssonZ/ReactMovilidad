import Index from './pages/Index';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import Parentesco from './pages/apoderados/Parentesco';
import Prueba from './pages/Prueba';
import Movilidad from './pages/movilidad/Movilidad';
import Grado from './pages/grados/Grado';
import Layout from "./components/layout";

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/parentesco" element={<Parentesco/>}/>
        <Route path="/" element={<Prueba/>}/>
        <Route path="/movilidad" element={<Movilidad/>}/>
        <Route path="/grado" element={<Grado/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;