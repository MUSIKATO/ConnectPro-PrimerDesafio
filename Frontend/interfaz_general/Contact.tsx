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
 * Incluye visualización de avatar, nombre, teléfono y acciones (favorito/eliminar).
 */
export const Contact = ({ contact, onToggleFavorite, onDelete }: Props) => {
  return (
    <div 
      className={`group flex items-center justify-between p-4 transition-all ${
        contact.favorito 
          ? 'bg-white border-2 border-yellow-400 rounded-xl shadow-sm' 
          : 'hover:bg-gray-50'
      }`}
    >
      {/* Sección de Información: Avatar y Textos */}
      <div className="flex items-center gap-4">
        {/* Avatar generado con las iniciales */}
        <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center text-[#137fec] font-bold">
          {contact.nombre[0]}{contact.apellido[0]}
        </div>
        
        <div>
          <h3 className="font-bold text-slate-900">
            {contact.nombre} {contact.apellido}
          </h3>
          <p className="text-sm text-slate-500">{contact.telefono}</p>
        </div>
      </div>

      {/* Sección de Acciones: Botones de Favorito y Borrar */}
      <div className="flex items-center gap-2">
        {/* Botón de Favorito Cambia el icono y color según el estado */}
        <button 
          onClick={() => onToggleFavorite(contact.id)} 
          className={`p-2 rounded-lg transition-colors ${
            contact.favorito ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'
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
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          title="Eliminar contacto"
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  );
};