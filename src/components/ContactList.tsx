import { Contact } from './Contact';
import type { ContactType } from '../types/contact';

/**
 * Propiedades para el componente ContactList.
 * Recibe el estado global y las funciones de control desde App.tsx.
 */
interface ContactListProps {
  /** Término de búsqueda para filtrar contactos por nombre o apellido */
  searchTerm: string;
  /** Array completo de contactos proveniente de la fuente de datos */
  contacts: ContactType[];
  /** Callback para cambiar el estado de favorito de un contacto */
  onToggleFavorite: (id: number) => void;
  /** Callback para eliminar un contacto de la lista */
  onDelete: (id: number) => void;
}

/**
 * Componente encargado de orquestar la visualización de los contactos.
 * Realiza el filtrado en tiempo real y divide la lista en categorías 
 * (Favoritos y Todos los contactos).
 */
export const ContactList = ({ 
  searchTerm, 
  contacts, 
  onToggleFavorite, 
  onDelete 
}: ContactListProps) => {

  /**
   * logica de filtrado:
   * Comparamos el término de búsqueda con el nombre y apellido.
   * Se convierte todo a minúsculas para que la búsqueda no sea sensible a mayúsculas.
   */
  const filteredContacts = contacts.filter(c => 
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.apellido.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * CLASIFICACIÓN:
   * Separamos los contactos ya filtrados en dos grupos para la interfaz.
   */
  const favorites = filteredContacts.filter(c => c.favorito);
  const others = filteredContacts.filter(c => !c.favorito);

  return (
    <div className="p-8 space-y-8">
      {/* SECCIÓN FAVORITOS: 
        Solo se renderiza si existen contactos marcados como favoritos 
        que coincidan con la búsqueda.
      */}
      {favorites.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase text-gray-400 mb-4 tracking-widest">
            Favoritos
          </h2>
          <div className="grid gap-3">
            {favorites.map(c => (
              <Contact 
                key={c.id} 
                contact={c} 
                onToggleFavorite={onToggleFavorite} 
                onDelete={onDelete} 
              />
            ))}
          </div>
        </section>
      )}
      
      {/* LISTA GENERAL:
        Muestra todos los contactos que no son favoritos. 
        Usa un diseño de lista dividida con bordes redondeados.
      */}
      <section>
        <h2 className="text-xs font-bold uppercase text-gray-400 mb-4 tracking-widest">
          Todos los contactos
        </h2>
        <div className="bg-white rounded-xl border divide-y overflow-hidden">
          {others.map(c => (
            <Contact 
              key={c.id} 
              contact={c} 
              onToggleFavorite={onToggleFavorite} 
              onDelete={onDelete} 
            />
          ))}
        </div>
      </section>
    </div>
  );
};