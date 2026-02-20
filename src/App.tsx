import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ContactList } from './components/ContactList';
import type { ContactType } from './types/contact';
import initialData from './data/contacts.json';

/**
 * Componente Principal 
 * Actúa como el contenedor central (Orquestador) de la aplicación.
 * Gestiona el estado global de los contactos y la lógica de filtrado.
 */
function App() {
  /**
   * ESTADO GLOBAL DE CONTACTOS:
   * Se inicializa con los datos del archivo JSON. 
   * Es la "fuente de verdad" para toda la aplicación.
   */
  const [contacts, setContacts] = useState<ContactType[]>(initialData);
  
  /**
   * ESTADO DE BÚSQUEDA:
   * Almacena el texto ingresado en el Header para filtrar la lista en tiempo real.
   */
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * LÓGICA DE REGISTRO (Para el equipo de Formulario):
   * Crea un nuevo contacto asignando un ID único basado en timestamp.
   * @param nuevo Objeto contacto sin ID ni estado de favorito.
   */
  const addContact = (nuevo: Omit<ContactType, 'id' | 'favorito'>) => {
    const nuevoContacto: ContactType = {
      ...nuevo,
      id: Date.now(),
      favorito: false
    };
    setContacts([...contacts, nuevoContacto]);
  };

  /**
   * GESTIÓN DE FAVORITOS:
   * Busca un contacto por ID e invierte su estado 'favorito'.
   */
  const toggleFavorite = (id: number) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, favorito: !c.favorito } : c));
  };

  /**
   * LÓGICA DE ELIMINACIÓN:
   * Filtra el array de contactos para remover el ID especificado.
   */
  const deleteContact = (id: number) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  return (
    /* LAYOUT PRINCIPAL: 
       Usa flexbox para ocupar el 100% del alto de la pantalla (h-screen) 
       y evitar el scroll en el cuerpo principal.
    */
    <div className="flex h-screen overflow-hidden bg-[#f6f7f8]">
      
      {/* Componente de navegación lateral (Fijo) */}
      <Sidebar />

      {/* ÁREA DE CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* CABECERA: Recibe acciones de búsqueda y creación */}
        <Header onSearch={setSearchTerm} onAdd={addContact} />

        {/* CONTENEDOR DE LISTA: Permite el scroll independiente de los contactos */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            
            {/* COMPONENTE DE LISTA: 
                Se le inyectan los datos y todas las funciones de control.
            */}
            <ContactList 
              searchTerm={searchTerm} 
              contacts={contacts} 
              onToggleFavorite={toggleFavorite}
              onDelete={deleteContact}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;