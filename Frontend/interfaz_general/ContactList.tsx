import { Contact } from './Contact';
import type { ContactType } from '../types/contact';

/**
 * Mi director de orquesta
 * Aquí definimos qué datos necesita este componente.
 * Recibe la lista completa, lo que el usuario escribe en el buscador (searchTerm),
 * y las funciones para interactuar (borrar, favorito, limpiar).
 */
interface ContactListProps {
  searchTerm: string;
  contacts: ContactType[];
  onToggleFavorite: (id: number) => void;
  onDelete: (id: number) => void;
  onClearAll?: () => void;
  onClearOthers?: () => void;
}

export const ContactList = ({ 
  searchTerm, 
  contacts, 
  onToggleFavorite, 
  onDelete,
  onClearAll,
  onClearOthers
}: ContactListProps) => {

  /** * PASO 2: EL BUSCADOR INTELIGENTE
   * Filtramos la lista original .toLowerCase()
   * para que coincidan siempre, sin importar cómo escriba el usuario.
   */
  const filteredContacts = contacts.filter(c => 
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.apellido.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /** * PASO 3: ORGANIZACIÓN POR CATEGORÍAS
   * De la lista ya filtrada, separamos a los contactos en dos grupos:
   * 1. Favoritos (para ponerlos arriba).
   * 2. El resto (others).
   */
  const favorites = filteredContacts.filter(c => c.favorito);
  const others = filteredContacts.filter(c => !c.favorito);

  return (
    <div className="p-8 space-y-10">
      
      {/* PASO 4: SECCIÓN DE FAVORITOS 
          "favorites.length > 0 &&". */}
      {favorites.length > 0 && (
        <section className="animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center justify-between mb-5 border-b border-yellow-200 pb-2">
            <h2 className="text-sm font-black uppercase text-slate-700 tracking-widest flex items-center gap-2">
              <span className="text-yellow-500 text-lg"></span> 
              Favoritos
            </h2>

            <div className="flex items-center gap-4">
              {/* Botón para vaciar la lista de favoritos */}
              {onClearAll && (
                <button 
                  onClick={onClearAll}
                  className="group flex items-center gap-1.5 text-[10px] font-bold text-red-400 hover:text-red-600 transition-colors uppercase tracking-wider"
                >
                  <span className="material-symbols-outlined text-sm">delete_sweep</span>
                  Eliminar todos
                </button>
              )}
              {/* Etiqueta dinámica de contador condicion  ternario true false */}
              <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm border border-yellow-200">
                {favorites.length} {favorites.length === 1 ? 'DESTACADO' : 'DESTACADOS'}
              </span>
            </div>
          </div>
          
          {/* Mapeamos el arreglo: Por cada favorito, pintamos un componente <Contact /> */}
          <div className="grid gap-3">
            {favorites.map(c => (
              <Contact key={c.id} contact={c} onToggleFavorite={onToggleFavorite} onDelete={onDelete} />
            ))}
          </div>
        </section>
      )}
      
      {/* PASO 5: LISTA GENERAL DE CONTACTOS */}
      <section>
        <div className="flex items-center justify-between mb-5 border-b border-blue-200 pb-2">
          <h2 className="text-sm font-black uppercase text-slate-700 tracking-widest">
            Todos los contactos
          </h2>
          
          <div className="flex items-center gap-4">
            {/* Botón para vaciar la lista normal */}
            {onClearOthers && others.length > 0 && (
              <button 
                onClick={onClearOthers}
                className="group flex items-center gap-1.5 text-[10px] font-bold text-red-400 hover:text-red-600 transition-colors uppercase tracking-wider"
              >
                <span className="material-symbols-outlined text-sm">delete_sweep</span>
                Eliminar todos
              </button>
            )}
            <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm border border-blue-100 uppercase">
              {others.length} {others.length === 1 ? 'Total' : 'Total'}
            </span>
          </div>
        </div>

        {/* Mapeamos el resto de contactos normales */}
        <div className="grid gap-3">
          {others.map(c => (
            <Contact key={c.id} contact={c} onToggleFavorite={onToggleFavorite} onDelete={onDelete} />
          ))}
        </div>

        {/* PASO 6: ESTADO VACÍO (Mejorando la UX)
            Si el buscador no encuentra nada, en lugar de una pantalla en blanco,
            mostramos este mensaje amigable indicando lo que el usuario escribió. */}
        {filteredContacts.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100">
            <span className="material-symbols-outlined text-slate-300 text-5xl mb-3">person_search</span>
            <p className="text-slate-400 font-medium text-sm">
              No se encontraron contactos para "{searchTerm}"
            </p>
          </div>
        )}
      </section>
    </div>
  );
};