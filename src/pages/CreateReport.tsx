import { useState, useEffect, type ChangeEvent } from 'react';
import { optimizeImage } from '../utils/imageOptimizer';

// Estructura lista para Firestore
interface ReportEntry {
  id: string; 
  ubicacion: string;
  asunto: string;
  votos: number;
  estado: string;
}

const CreateReport = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // 1. AHORA INICIA VACÍO: Esperando datos reales
  const [reports, setReports] = useState<ReportEntry[]>([]);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    ubicacion: '',
    asunto: '',
    descripcion: '',
    evidencia: null as Blob | null
  });

  // 2. EL CAMINO QUEDA LISTO aca vas a insertar tu logica fer
  useEffect(() => {
    const loadFromDatabase = async () => {
      setFetching(true);
      try {
        // --- agui vas a conectar la base de datos --
        // Por ahora, el estado se queda como un arrglo vacío []
        setReports([]); 
      } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
      } finally {
        setFetching(false);
      }
    };
    loadFromDatabase();
  }, []);

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const optimized = await optimizeImage(file);
      setFormData({ ...formData, evidencia: optimized });
      setPreview(URL.createObjectURL(optimized));
    }
  };

  const sendReport = async () => {
    if(!formData.ubicacion || !formData.asunto) return alert("Por favor completa los campos");
    setLoading(true);
    
    try {
      console.log("Enviando reporte real a la nube...");
      alert("Reporte enviado con éxito");
      setFormData({ ubicacion: '', asunto: '', descripcion: '', evidencia: null });
      setPreview(null);
    } catch (error) { // Cambiamos 'e' por 'error' para que sea más claro
      console.error("Error al enviar el reporte:", error); // 
      alert("Error al enviar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#F4F7F9', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <nav style={styles.navbar}>
        <div style={{ fontWeight: 'bold', fontSize: '20px' }}>⚒️ Campus Fixer</div>
        <div style={styles.avatar}></div>
      </nav>

      <main style={{ maxWidth: '800px', margin: '20px auto', padding: '0 20px' }}>
        
        <section style={styles.card}>
          <h2 style={{ color: '#002147', marginTop: 0 }}>Reportar Daño</h2>
          <div style={styles.formGrid}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <select 
                style={styles.input}
                value={formData.ubicacion}
                onChange={(e) => setFormData({...formData, ubicacion: e.target.value})}
              >
               <option value="">Seleccionar Ubicación...</option>
  {/* Salones */}
  <option value="Salón 1">Salón 1</option>
  <option value="Salón 2">Salón 2</option>
  <option value="Salón 3">Salón 3</option>
  {/* Baños */}
  <option value="Baño Hombres">Baño de Hombres</option>
  <option value="Baño Mujeres">Baño de Mujeres</option>
</select>

              <input 
                type="text" 
                placeholder="Asunto del reporte" 
                style={styles.input} 
                value={formData.asunto}
                onChange={(e) => setFormData({...formData, asunto: e.target.value})}
              />

              <textarea 
                placeholder="Descripción detallada..." 
                style={{ ...styles.input, height: '100px', resize: 'none' }}
                value={formData.descripcion}
                onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              />
            </div>

            <div style={styles.imageSection}>
              <label style={styles.attachBtn}>
                {preview ? <img src={preview} style={styles.previewImg} alt="Evidencia" /> : <>📷 Adjuntar Foto</>}
                <input type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
              </label>
              
              <button className="btn-primary" onClick={sendReport} disabled={loading} style={{ marginTop: 'auto' }}>
                {loading ? 'Subiendo...' : '🚀 Enviar Reporte'}
              </button>
            </div>
          </div>
        </section>

        {/* FEED DINÁMICO SIN DATOS QUEMADOS */}
        <section style={{ marginTop: '40px' }}>
          <h3 style={{ color: '#555' }}>Reportes Recientes</h3>
          
          {fetching ? (
            <p style={{ textAlign: 'center', color: '#888' }}>Sincronizando con el servidor...</p>
          ) : reports.length === 0 ? (
            <div style={styles.emptyState}>
              <p>No hay reportes activos en esta zona.</p>
              <small>Sé el primero en informar un problema.</small>
            </div>
          ) : (
            reports.map(report => (
              <div key={report.id} style={styles.feedCard}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', color: '#002147' }}>{report.ubicacion}</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>{report.asunto}</div>
                </div>
                <div style={styles.badge}>{report.estado}</div>
                <button style={styles.upvoteBtn}>▲ {report.votos}</button>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

const styles = {
  navbar: { backgroundColor: '#002147', color: 'white', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  avatar: { width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#4A90E2', border: '2px solid white' },
  card: { background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: '1px solid #E0E0E0' },
  formGrid: { display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '25px' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #DDD', fontSize: '15px', outline: 'none', width: '100%', boxSizing: 'border-box' as const },
  imageSection: { display: 'flex', flexDirection: 'column' as const, gap: '15px' },
  attachBtn: { flex: 1, border: '2px dashed #4A90E2', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', color: '#4A90E2', overflow: 'hidden', minHeight: '150px' },
  previewImg: { width: '100%', height: '100%', objectFit: 'cover' as const },
  feedCard: { background: 'white', padding: '15px 20px', borderRadius: '12px', marginBottom: '10px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', gap: '15px' },
  badge: { padding: '4px 10px', borderRadius: '20px', backgroundColor: '#E3F2FD', color: '#1976D2', fontSize: '12px', fontWeight: 'bold' },
  upvoteBtn: { padding: '8px 12px', borderRadius: '8px', border: '1px solid #DDD', backgroundColor: 'white', cursor: 'pointer', fontWeight: 'bold' },
  emptyState: { textAlign: 'center' as const, padding: '40px', background: '#fff', borderRadius: '12px', color: '#999', border: '1px dashed #ccc' }
};

export default CreateReport;