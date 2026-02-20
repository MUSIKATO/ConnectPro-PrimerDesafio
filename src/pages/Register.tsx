import { useState } from 'react';
import { Link } from 'react-router-dom';
import { optimizeImage } from '../utils/imageOptimizer'; // Asegúrate de tener este archivo creado

const Register = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Manejador de la imagen optimizada
  const handlePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Aquí ocurre la magia: reducimos el peso antes de guardar
        const optimized = await optimizeImage(file);
        setPreview(URL.createObjectURL(optimized));
      } catch (error) {
        console.error("Error optimizando imagen", error);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulación de envío
    setTimeout(() => {
      alert("¡Usuario registrado! (Aquí tu amigo conectará Firebase)");
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: 'var(--shadow-card)', maxWidth: '400px', width: '100%' }}>
        
        <h2 style={{ color: 'var(--color-primary)', textAlign: 'center' }}>Crear Cuenta Nueva</h2>
        <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '20px' }}>Únete para reportar daños en el campus.</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <input type="text" placeholder="Nombre Completo" required style={styles.input} />
          <input type="text" placeholder="Carnet (ej. AB123456)" required style={styles.input} />
          <input type="email" placeholder="Correo Institucional" required style={styles.input} />
          
          {/* Subida de foto optimizada */}
          <label style={styles.fileLabel}>
            {preview ? (
              <img src={preview} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                <span style={{ fontSize: '24px' }}>📷</span>
                <span>Subir Foto de Perfil</span>
                <span style={{ fontSize: '10px', color: '#999' }}>(Se optimizará autom.)</span>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />
          </label>
          
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Procesando..." : "Registrarme"}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/" style={{ color: '#666', fontSize: '14px', textDecoration: 'none' }}>
            ← Volver al Inicio de Sesión
          </Link>
        </div>

      </div>
    </div>
  );
};

// Estilos locales para mantener el código limpio
const styles = {
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #E0E0E0',
    fontSize: '14px',
    outline: 'none',
    transition: 'border 0.2s',
    width: '100%',
    boxSizing: 'border-box' as const // Necesario para TS
  },
  fileLabel: {
    border: '2px dashed #4A90E2',
    backgroundColor: '#F8F9FA',
    padding: '15px',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'center' as const,
    color: '#4A90E2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100px'
  }
};

export default Register;