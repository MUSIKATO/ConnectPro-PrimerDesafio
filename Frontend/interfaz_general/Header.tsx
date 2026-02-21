
interface HeaderProps {
  onSearch: (value: string) => void;
  onOpenAdd: () => void;
}

export const Header = ({ onSearch, onOpenAdd }: HeaderProps) => {
  return (
    // px-4 en lugar de px-8 para ganar espacio en lados
    <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 w-full">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3 md:gap-6">

        {/* Barra de Búsqueda */}
        <div className="flex-1 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          <input
            className="w-full bg-gray-100 border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#137fec] outline-none transition-all"
            placeholder="Search..."
            type="text"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

       {/* Botón: Texto oculto en celulares, solo icono para ahorrar espacio */}
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