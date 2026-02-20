
interface HeaderProps {
  onSearch: (value: string) => void;
  onOpenAdd: () => void;
}

export const Header = ({ onSearch, onOpenAdd }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 w-full">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-6">

        {/* Barra de Búsqueda */}
        <div className="flex-1 relative max-w-xl">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          <input
            className="w-full bg-gray-100 border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#137fec] outline-none transition-all"
            placeholder="Search by name..."
            type="text"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* BOTÓN "ADD CONTACT" CON SU DISEÑO ORIGINAL RESTAURADO */}
        <button
          onClick={onOpenAdd}
          className="bg-[#137fec] hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all shadow-sm outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Add Contact</span>
        </button>

      </div>
    </header>
  );
};