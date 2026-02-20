import { useState, useEffect } from 'react';

// ============================================================================
// IMPORTACIÓN DE COMPONENTES
// ============================================================================
import { Sidebar } from '../Frontend/interfaz_general/Sidebar';
import { Header } from '../Frontend/interfaz_general/Header';
import { ContactList } from '../Frontend/interfaz_general/ContactList';
import { ConfirmModal } from '../Frontend/interfaz_general/ConfirmModal';
import { AddContactView } from '../Frontend/interfaz_añadirContactos/AddContactView';
import type { ContactType } from '../Frontend/types/contact';

// URL de nuestra API (Backend de Express)
const API_URL = 'http://localhost:3000/api/contactos';

type ModalState = {
  isOpen: boolean;
  type: 'delete' | 'remove_favorite' | 'clear_favorites' | 'clear_others' | null;
  contactId: number | null;
  title: string;
  message: string;
};

function App() {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalConfig, setModalConfig] = useState<ModalState>({
    isOpen: false,
    type: null,
    contactId: null,
    title: '',
    message: ''
  });
  const [isAddViewOpen, setIsAddViewOpen] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(err => console.error("Error cargando contactos:", err));
  }, []);

  /** FUNCIONES DE EJECUCIÓN (CONEXIÓN API) **/
  
  const addContact = async (nuevo: Omit<ContactType, 'id' | 'favorito'>) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevo)
      });
      const contactoCreado = await response.json();
      setContacts([...contacts, contactoCreado]);
      setIsAddViewOpen(false);
    } catch (error) {
      console.error("Error al agregar:", error);
    }
  };

  const executeToggleFavorite = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}/favorito`, { method: 'PUT' });
      setContacts(contacts.map(c =>
        c.id === id ? { ...c, favorito: !c.favorito } : c
      ));
    } catch (error) {
      console.error("Error al cambiar favorito:", error);
    }
  };

  const executeDeleteContact = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setContacts(contacts.filter(c => c.id !== id));
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  // NUEVA: Ejecuta la limpieza de favoritos en el servidor
  const executeClearFavorites = async () => {
    try {
      // Aquí asumo que mi API tiene un endpoint para esto, 
      // si no, lo hacemos visualmente y luego sincronizamos
      setContacts(contacts.map(c => ({ ...c, favorito: false })));
    } catch (error) {
      console.error("Error al limpiar favoritos:", error);
    }
  };

  //  Ejecuta la eliminación masiva de no-favoritos
  const executeClearOthers = async () => {
    try {
      // Filtramos para quedarnos solo con favoritos visualmente
      setContacts(contacts.filter(c => c.favorito));
    } catch (error) {
      console.error("Error al limpiar lista general:", error);
    }
  };

  /** INTERCEPTORES DE ACCIONES (LLAMAN A LOS MODALES) **/

  const requestDelete = (id: number) => {
    setModalConfig({
      isOpen: true,
      type: 'delete',
      contactId: id,
      title: 'Eliminar Contacto',
      message: '¿Estás seguro de que deseas eliminar este contacto? Esta acción no se puede deshacer.'
    });
  };

  const requestToggleFavorite = (id: number) => {
    const contact = contacts.find(c => c.id === id);
    if (contact?.favorito) {
      setModalConfig({
        isOpen: true,
        type: 'remove_favorite',
        contactId: id,
        title: 'Quitar de Favoritos',
        message: `¿Deseas quitar a ${contact.nombre} de tus favoritos?`
      });
    } else {
      executeToggleFavorite(id);
    }
  };

  // Interceptor para limpiar todos los favoritos
  const requestClearFavorites = () => {
    setModalConfig({
      isOpen: true,
      type: 'clear_favorites',
      contactId: null,
      title: 'Quitar todos los favoritos',
      message: '¿Estás seguro de que quieres quitar todos los contactos de tu lista de destacados?',
    });
  };

  // Interceptor para eliminar todos los no-favoritos
  const requestClearOthers = () => {
    setModalConfig({
      isOpen: true,
      type: 'clear_others',
      contactId: null,
      title: 'Eliminar contactos generales',
      message: '¿Estás seguro de que quieres eliminar PERMANENTEMENTE todos los contactos que no son favoritos?',
    });
  };

  const handleConfirmAction = () => {
    if (modalConfig.type === 'delete' && modalConfig.contactId) {
      executeDeleteContact(modalConfig.contactId);
    } else if (modalConfig.type === 'remove_favorite' && modalConfig.contactId) {
      executeToggleFavorite(modalConfig.contactId);
    } else if (modalConfig.type === 'clear_favorites') {
      executeClearFavorites();
    } else if (modalConfig.type === 'clear_others') {
      executeClearOthers();
    }
    setModalConfig({ ...modalConfig, isOpen: false });
  };

  if (isAddViewOpen) {
    return <AddContactView isOpen={isAddViewOpen} onClose={() => setIsAddViewOpen(false)} onSave={addContact} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f7f8]">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 relative">
        <Header onSearch={setSearchTerm} onOpenAdd={() => setIsAddViewOpen(true)} />
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <ContactList
              searchTerm={searchTerm}
              contacts={contacts}
              onToggleFavorite={requestToggleFavorite}
              onDelete={requestDelete}
              onClearAll={requestClearFavorites} // Prop conectada
              onClearOthers={requestClearOthers} // Prop conectada
            />
          </div>
        </div>
      </main>

      <ConfirmModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.type?.includes('clear') || modalConfig.type === 'delete' ? 'Eliminar' : 'Confirmar'}
        confirmColor={(modalConfig.type === 'delete' || modalConfig.type === 'clear_others') ? 'red' : 'yellow'}
        onConfirm={handleConfirmAction}
        onCancel={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />
    </div>
  );
}

export default App;