/**
 * Componentes de la barra lateral.
 * Proporciona la navegación principal de la aplicación y muestra el perfil del usuario.
 */
export const Sidebar = () => {
    return (
      <aside className="w-64 border-r border-gray-200 bg-white flex flex-col shrink-0 h-screen">
        
        {/* LOGOTIPO Y BRANDING: 
            Identificación de la aplicación "ConnectPro".
        */}
        <div className="p-6 flex items-center gap-3">
          <div className="bg-[#137fec] size-10 rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined">contacts</span>
          </div>
          <div>
            <h1 className="font-bold text-lg">ConnectPro</h1>
            <p className="text-xs text-gray-500">Contact Manager</p>
          </div>
        </div>

        {/* NAVEGACIÓN: 
            Enlaces para filtrar la vista principal. 
            Nota: Actualmente el estado visual es estático.
        */}
        <nav className="flex-1 px-4 py-2 space-y-1">
          {/* Opción: Todos los contactos (Activa por defecto) */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-50 text-[#137fec] font-medium cursor-pointer transition-colors">
            <span className="material-symbols-outlined">group</span>
            <span>All Contacts</span>
          </div>
          
          {/* Opción: Favoritos */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors">
            <span className="material-symbols-outlined">star</span>
            <span>Favorites</span>
          </div>
        </nav>

        {/* PERFIL DE USUARIO:
            Muestra la información del usuario actual al final de la barra lateral.
        */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-2">
            {/* Avatar con iniciales */}
            <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center text-[#137fec] font-bold text-xs">
              VA
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Vladimir Aguila</p>
              <p className="text-[10px] text-gray-500">Age: 21</p>
            </div>
          </div>
        </div>
      </aside>
    );
};