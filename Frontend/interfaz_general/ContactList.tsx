import { Contact } from './Contact';
import type { ContactType } from '../types/contact';

/**
 * Mi director de orquesta
 * Aquí definimos qué datos necesita este componente.
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

  /** * PASO 2: EL BUSCADOR INTELIGENTE */
  const filteredContacts = contacts.filter(c => 
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.apellido.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /** * PASO 3: ORGANIZACIÓN POR CATEGORÍAS */
  const favorites = filteredContacts.filter(c => c.favorito);
  const others = filteredContacts.filter(c => !c.favorito);

  return (
    // CAMBIO RESPONSIVO: p-4 en móvil, p-8 en escritorio
    <div className="p-4 md:p-8 space-y-10">
      
      {/* PASO 4: SECCIÓN DE FAVORITOS */}
      {favorites.length > 0 && (
        <section className="animate-in fade-in slide-in-from-top-4 duration-500">
          {/* CAMBIO RESPONSIVO: flex-col en móvil para que no se amontone el título con los botones */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 border-b border-yellow-200 pb-2 gap-3">
            <h2 className="text-sm font-black uppercase text-slate-700 tracking-widest flex items-center gap-2">
              Favoritos
            </h2>

            <div className="flex items-center justify-between sm:justify-end gap-4">
              {onClearAll && (
                <button 
                  onClick={onClearAll}
                  className="group flex items-center gap-1.5 text-[10px] font-bold text-red-400 hover:text-red-600 transition-colors uppercase tracking-wider"
                >
                  <span className="material-symbols-outlined text-sm">delete_sweep</span>
                  <span>Eliminar todos</span>
                </button>
              )}
              <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm border border-yellow-200">
                {favorites.length} {favorites.length === 1 ? 'DESTACADO' : 'DESTACADOS'}
              </span>
            </div>
          </div>
          
          <div className="grid gap-3">
            {favorites.map(c => (
              <Contact key={c.id} contact={c} onToggleFavorite={onToggleFavorite} onDelete={onDelete} />
            ))}
          </div>
        </section>
      )}
      
      {/* PASO 5: LISTA GENERAL DE CONTACTOS */}
      <section>
        {/* CAMBIO RESPONSIVO: flex-col en móvil */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 border-b border-blue-200 pb-2 gap-3">
          <h2 className="text-sm font-black uppercase text-slate-700 tracking-widest">
            Todos los contactos
          </h2>
          
          <div className="flex items-center justify-between sm:justify-end gap-4">
            {onClearOthers && others.length > 0 && (
              <button 
                onClick={onClearOthers}
                className="group flex items-center gap-1.5 text-[10px] font-bold text-red-400 hover:text-red-600 transition-colors uppercase tracking-wider"
              >
                <span className="material-symbols-outlined text-sm">delete_sweep</span>
                <span>Eliminar todos</span>
              </button>
            )}
            <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm border border-blue-100 uppercase">
              {others.length} Total
            </span>
          </div>
        </div>

        <div className="grid gap-3">
          {others.map(c => (
            <Contact key={c.id} contact={c} onToggleFavorite={onToggleFavorite} onDelete={onDelete} />
          ))}
        </div>

        {/* PASO 6: ESTADO VACÍO */}
        {filteredContacts.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100 px-4">
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