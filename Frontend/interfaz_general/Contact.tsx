import type { ContactType } from '../types/contact';

/**
 * Interfaz para las propiedades del componente Contact.
 * Define los datos del contacto y las funciones de control.
 */
interface Props {
  /** Objeto con la información completa del contacto */
  contact: ContactType;
  /** Función para alternar el estado de favorito mediante el ID */
  onToggleFavorite: (id: number) => void;
  /** Función para eliminar el contacto mediante el ID */
  onDelete: (id: number) => void;
}

/**
 * Componente funcional que representa una fila o tarjeta de contacto individual.
 */
export const Contact = ({ contact, onToggleFavorite, onDelete }: Props) => {
  return (
    <div 
      className={`group flex items-center justify-between p-4 transition-all duration-300 ${
        contact.favorito 
          ? 'bg-white border-2 border-yellow-400 border-l-yellow-500 border-l-[6px] rounded-xl shadow-sm' 
          : 'bg-white border border-slate-100 border-l-4 border-l-blue-400 rounded-xl hover:shadow-md'
      }`}
    >
      {/* Sección de Información: Avatar y Textos */}
      <div className="flex items-center gap-4">
        {/* Avatar generado con las iniciales */}
        <div className={`size-10 rounded-full flex items-center justify-center font-bold transition-colors ${
          contact.favorito ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-[#137fec]'
        }`}>
          {contact.nombre[0]}{contact.apellido[0]}
        </div>
        
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900">
              {contact.nombre} {contact.apellido}
            </h3>
            {contact.favorito && (
              <span className="text-[10px] bg-yellow-100 text-yellow-700 font-black px-1.5 py-0.5 rounded uppercase tracking-tighter border border-yellow-200">
                TOP
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500">{contact.telefono}</p>
        </div>
      </div>

      {/* Sección de Acciones: Botones de Favorito y Borrar */}
      <div className="flex items-center gap-2">
        {/* Botón de Favorito */}
        <button 
          onClick={() => onToggleFavorite(contact.id)} 
          className={`p-2 rounded-lg transition-colors ${
            contact.favorito ? 'text-yellow-500 bg-yellow-50' : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-50'
          }`}
          title="Marcar como favorito"
        >
          <span 
            className="material-symbols-outlined" 
            style={{ fontVariationSettings: `'FILL' ${contact.favorito ? 1 : 0}` }}
          >
            star
          </span>
        </button>

        {/* Botón de Borrar */}
        <button 
          onClick={() => onDelete(contact.id)} 
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          title="Eliminar contacto"
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  );
};