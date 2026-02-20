import { useState, useEffect } from 'react';

// ============================================================================
// IMPORTACIÓN DE COMPONENTES
// ============================================================================
// 1. Componentes de la interfaz principal
import { Sidebar } from '../Frontend/interfaz_general/Sidebar';
import { Header } from '../Frontend/interfaz_general/Header';
import { ContactList } from '../Frontend/interfaz_general/ContactList';

// 2. Modales y vistas secundarias
import { ConfirmModal } from '../Frontend/interfaz_general/ConfirmModal';
import { AddContactView } from '../Frontend/interfaz_añadirContactos/AddContactView';

// 3. Tipos de datos
import type { ContactType } from '../Frontend/types/contact';

// ============================================================================
// CONSTANTES GLOBALES
// ============================================================================
// URL de nuestra API (Backend de Express)
const API_URL = 'http://localhost:3000/api/contactos';

/**
 * Tipo que define la estructura del estado de nuestro modal de confirmación.
 * Nos permite saber qué acción se va a realizar (borrar o quitar favorito)
 * y a qué contacto específico se le aplicará la acción.
 */
type ModalState = {
  isOpen: boolean;
  type: 'delete' | 'remove_favorite' | null;
  contactId: number | null;
  title: string;
  message: string;
};

// ============================================================================
// COMPONENTE PRINCIPAL: App
// ============================================================================
function App() {
  /**
   * ESTADOS GLOBALES DE LA APLICACIÓN
   */
  // 1. Array principal de contactos obtenidos de la API
  const [contacts, setContacts] = useState<ContactType[]>([]);
  // 2. Término de búsqueda escrito en el Header para filtrar la lista
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * ESTADOS DE CONTROL DE INTERFAZ (Modales y Vistas)
   */
  // 1. Estado para controlar el modal de advertencias (eliminar/quitar favorito)
  const [modalConfig, setModalConfig] = useState<ModalState>({
    isOpen: false,
    type: null,
    contactId: null,
    title: '',
    message: ''
  });

  // 2. Estado booleano para controlar qué interfaz mostrar (Lista principal vs Añadir Contacto)
  const [isAddViewOpen, setIsAddViewOpen] = useState(false);

  /**
   * EFECTO DE INICIO (ON MOUNT)
   * Se ejecuta una sola vez al cargar la aplicación.
   * Hace una petición GET al backend para obtener la lista de contactos inicial.
   */
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(err => console.error("Error cargando contactos:", err));
  }, []);

  /**
   * FUNCIÓN: Añadir un nuevo contacto
   * Recibe los datos del formulario (AddContactView) sin ID ni Favorito.
   * Hace un POST al backend, espera la respuesta con el ID generado,
   * y luego actualiza la lista visual de React.
   */
  const addContact = async (nuevo: Omit<ContactType, 'id' | 'favorito'>) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevo)
      });
      const contactoCreado = await response.json();

      // Añadimos el nuevo contacto al array existente
      setContacts([...contacts, contactoCreado]);

      // Una vez guardado con éxito, cerramos la vista de añadir para volver a la lista
      setIsAddViewOpen(false);
    } catch (error) {
      console.error("Error al agregar:", error);
    }
  };

  /**
   * FUNCIÓN: Ejecutar cambio de Favorito (Habla con la API)
   * Hace un PUT al backend para invertir el estado de "favorito".
   */
  const executeToggleFavorite = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}/favorito`, { method: 'PUT' });
      // Actualizamos visualmente el contacto específico en el array de React
      setContacts(contacts.map(c =>
        c.id === id ? { ...c, favorito: !c.favorito } : c
      ));
    } catch (error) {
      console.error("Error al cambiar favorito:", error);
    }
  };

  /**
   * FUNCIÓN: Ejecutar Eliminación (Habla con la API)
   * Hace un DELETE al backend.
   */
  const executeDeleteContact = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      // Removemos visualmente el contacto del array de React
      setContacts(contacts.filter(c => c.id !== id));
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  /**
   * INTERCEPTORES DE ACCIONES
   * Estas funciones son llamadas por la interfaz de usuario en lugar de 
   * ejecutar directamente las peticiones a la API. Sirven para abrir 
   * el modal de confirmación antes de hacer algo destructivo.
   */

  // 1. Cuando el usuario hace clic en el basurero
  const requestDelete = (id: number) => {
    setModalConfig({
      isOpen: true,
      type: 'delete',
      contactId: id,
      title: 'Eliminar Contacto',
      message: '¿Estás seguro de que deseas eliminar este contacto de forma permanente? Esta acción no se puede deshacer.'
    });
  };

  // 2. Cuando el usuario hace clic en la estrella de favorito
  const requestToggleFavorite = (id: number) => {
    const contact = contacts.find(c => c.id === id);

    // Si el contacto ya es favorito (estrella llena), lanzamos advertencia antes de quitarlo.
    if (contact?.favorito) {
      setModalConfig({
        isOpen: true,
        type: 'remove_favorite',
        contactId: id,
        title: 'Quitar de Favoritos',
        message: `¿Estás seguro de que deseas quitar a ${contact.nombre} de tu lista de favoritos?`
      });
    } else {
      // Si el contacto NO es favorito (estrella vacía), lo agregamos directamente sin molestar al usuario.
      executeToggleFavorite(id);
    }
  };

  /**
   * FUNCIÓN: Manejador de confirmación del Modal
   * Esta función se ejecuta solo si el usuario presiona "Confirmar" o "Eliminar" en el modal.
   * Revisa qué tipo de acción estaba pendiente en el estado y ejecuta la API correspondiente.
   */
  const handleConfirmAction = () => {
    if (modalConfig.type === 'delete' && modalConfig.contactId) {
      executeDeleteContact(modalConfig.contactId);
    } else if (modalConfig.type === 'remove_favorite' && modalConfig.contactId) {
      executeToggleFavorite(modalConfig.contactId);
    }
    // Una vez ejecutada la acción, cerramos el modal limpiando su estado
    setModalConfig({ ...modalConfig, isOpen: false });
  };

  // ============================================================================
  // RENDERIZADO CONDICIONAL DE INTERFACES
  // ============================================================================

  /**
   * VISTA: AÑADIR CONTACTO
   * Si el estado isAddViewOpen es true, la aplicación NO renderiza la lista,
   * sino que dibuja únicamente la pantalla del formulario.
   */
  if (isAddViewOpen) {
    return (
      <AddContactView
        isOpen={isAddViewOpen}
        onClose={() => setIsAddViewOpen(false)} // Botón de volver
        onSave={addContact}                     // Botón de guardar
      />
    );
  }

  /**
   * VISTA: PRINCIPAL (Lista de contactos)
   * Si isAddViewOpen es false, renderizamos la estructura principal de la app.
   */
  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f7f8]">

      {/* BARRA LATERAL (Fija a la izquierda) */}
      <Sidebar />

      {/* ÁREA PRINCIPAL DERECHA */}
      <main className="flex-1 flex flex-col min-w-0 relative">

        {/* CABECERA:
            - onSearch: actualiza el término de búsqueda
            - onOpenAdd: cambia el estado para renderizar la vista de añadir
        */}
        <Header
          onSearch={setSearchTerm}
          onOpenAdd={() => setIsAddViewOpen(true)}
        />

        {/* CONTENEDOR DE LA LISTA: (Con scroll independiente) */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <ContactList
              searchTerm={searchTerm}
              contacts={contacts}
              onToggleFavorite={requestToggleFavorite} // Pasamos los interceptores, no la ejecución directa
              onDelete={requestDelete}                 // Pasamos los interceptores, no la ejecución directa
            />
          </div>
        </div>
      </main>

      {/* MODAL DE CONFIRMACIÓN: 
          Siempre está presente en el DOM pero oculto hasta que modalConfig.isOpen sea true 
      */}
      <ConfirmModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.type === 'delete' ? 'Eliminar' : 'Quitar de favoritos'}
        confirmColor={modalConfig.type === 'delete' ? 'red' : 'yellow'}
        onConfirm={handleConfirmAction}
        onCancel={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />

    </div>
  );
}

export default App;