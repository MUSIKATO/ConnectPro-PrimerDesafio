import { Link, useNavigate } from 'react-router-dom'; // 1. Agregamos useNavigate

const Login = () => {
  const navigate = useNavigate(); // 2. Inicializamos la función de navegación

  const handleGoogleLogin = () => {
    console.log("Iniciando flujo de Google...");
    
    // 3. Simulación: Al hacer clic, nos manda a la pantalla de reportes.
    // Esto editalo fer aca hago como que furula pero es pura ksk ahi lo agregas cuando conectes firebase
    navigate('/reportar'); 
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: 'var(--shadow-card)', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
        
        {/* Logo Circular */}
        <div style={{ background: '#002147', width: '60px', height: '60px', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>CF</div>
        
        <h2 style={{ color: 'var(--color-primary)', marginBottom: '10px' }}>Bienvenido a Campus Fixer</h2>
        <p style={{ color: '#666', marginBottom: '30px', fontSize: '14px' }}>Accede para reportar problemas de infraestructura.</p>
        
        {/* Botón Google - Ahora llama a handleGoogleLogin */}
        <button onClick={handleGoogleLogin} className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          <span>G</span> Iniciar sesión Institucional
        </button>
        
        <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', marginTop: '20px' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>¿No tienes cuenta?</p>
          <Link to="/register" style={{ color: 'var(--color-secondary)', textDecoration: 'none', fontWeight: '600' }}>
            Crear un usuario nuevo
          </Link>
        </div>
        
        <p style={{ fontSize: '12px', marginTop: '20px', color: '#999' }}>Solo para correos electrónicos institucionales</p>
      </div>
    </div>
  );
};

export default Login;