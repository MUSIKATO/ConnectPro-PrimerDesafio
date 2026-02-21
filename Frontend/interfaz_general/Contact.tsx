// importacion de tipo  
// que el componente solo reciba datos válidos segun lo defini en contact.ts
import type { ContactType } from '../types/contact';
/**
 * 1. inter props:
 * Definimos qué recibe el componente: los datos del contacto 
 * y las funciones para editar o borrar (comunicación con el padre).
 */
interface Props {
  contact: ContactType;
  onToggleFavorite: (id: number) => void;
  onDelete: (id: number) => void;
}

// DECLARACIÓN:  desestructuracion.
export const Contact = ({ contact, onToggleFavorite, onDelete }: Props) => {
  return (
    <div 
      /* 2. DISEÑO DINÁMICO: 
         Si es favorito, aplicamos borde amarillo  a la izquierda. 
         Si no, un borde azul estándar. Esto da jerarquía visual. */
      className={`group flex items-center justify-between p-4 transition-all duration-300 ${
        contact.favorito 
          ? 'bg-white border-2 border-yellow-400 border-l-yellow-500 border-l-[6px] rounded-xl shadow-sm' 
          : 'bg-white border border-slate-100 border-l-4 border-l-blue-400 rounded-xl hover:shadow-md'
      }`}
    >
      <div className="flex items-center gap-4">
        
        {/* 3. AVATAR AUTOMÁTICO*/}
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
            
            {/* 4. ETIQUETA CONDICIONAL: 
                Solo aparece la insignia 'TOP' si el estado favorito es verdadero. */}
            {contact.favorito && (
              <span className="text-[10px] bg-yellow-100 text-yellow-700 font-black px-1.5 py-0.5 rounded uppercase border border-yellow-200">
                TOP
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500">{contact.telefono}</p>
        </div>
      </div>

      {/* 5. ACCIONES:
          Botones que disparan los eventos onDelete y onToggleFavorite pasando el ID. */}
      <div className="flex items-center gap-2">
        <button 
          onClick={() => onToggleFavorite(contact.id)} 
          className={`p-2 rounded-lg transition-colors ${
            contact.favorito ? 'text-yellow-500 bg-yellow-50' : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-50'
          }`}
        >
          <span 
            className="material-symbols-outlined" 
            style={{ fontVariationSettings: `'FILL' ${contact.favorito ? 1 : 0}` }}
          >
            star
          </span>
        </button>

        <button 
          onClick={() => onDelete(contact.id)} 
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  );
};