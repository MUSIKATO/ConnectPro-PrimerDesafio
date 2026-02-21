/**
 * Interfaz para las propiedades del componente Header.
 * Define los contratos de comunicación entre App.tsx y este componente.
 * @property onSearch - Función que emite el término de búsqueda al padre.
 * @property onOpenAdd - Función que dispara la apertura del formulario de creación.
 */
interface HeaderProps {
  onSearch: (value: string) => void;
  onOpenAdd: () => void;
}

export const Header = ({ onSearch, onOpenAdd }: HeaderProps) => {
  return (
    /* CONTENEDOR PRINCIPAL:
       Utiliza 'w-full' para ocupar todo el ancho del viewport.
       Aplica 'px-4' en móviles y 'md:px-8' en escritorio para optimizar el espacio lateral.
    */
    <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 w-full">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3 md:gap-6">

        {/* BARRA DE BÚSQUEDA DINÁMICA:
            El 'flex-1' permite que el buscador se expanda para ocupar el espacio disponible.
            El evento 'onChange' captura el input en tiempo real para el filtrado reactivo.
        */}
        <div className="flex-1 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            search
          </span>
          <input
            className="w-full bg-gray-100 border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#137fec] outline-none transition-all"
            placeholder="Search..."
            type="text"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* BOTÓN DE ACCIÓN responsivo:
            Se implementa 'hidden md:inline' en el texto para ahorrar espacio en móviles (mostrando solo el icono).
            Utiliza 'transition-all' para mejorar el feedback visual al hacer hover.
        */}
        <button
          onClick={onOpenAdd}
          className="bg-[#137fec] hover:bg-blue-600 text-white p-2.5 md:px-5 md:py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span className="hidden md:inline">Add Contact</span>
        </button>

      </div>
    </header>
  );
};