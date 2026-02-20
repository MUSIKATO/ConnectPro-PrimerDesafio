import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importaciones perezosas (Lazy Loading) - Optimizan el uso de memoria en la nube
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const CreateReport = lazy(() => import('./pages/CreateReport')); 

function App() {
  return (
    <Router>
      {/* Suspense ayuda a que la app no se trabe mientras descarga los módulos */}
      <Suspense fallback={
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh', 
          color: '#002147',
          fontFamily: 'Inter, sans-serif'
        }}>
          Cargando Campus Fixer...
        </div>
      }>
        <Routes>
          {/* Ruta Inicial: Login */}
          <Route path="/" element={<Login />} />
          
          {/* Ruta para crear usuario nuevo */}
          <Route path="/register" element={<Register />} />
          
          {/* NUEVA RUTA: Apartado de Reportes de Daños */}
          <Route path="/reportar" element={<CreateReport />} />
          
          {/* Ruta de seguridad: Si escriben cualquier cosa, manda al Login */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;