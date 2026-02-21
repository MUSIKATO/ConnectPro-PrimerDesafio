import { useState } from 'react';

/**
 * Componentes de la barra lateral.
 * Proporciona la navegación principal de la aplicación y muestra el perfil del usuario.
 */
export const Sidebar = () => {
  // Estado para saber qué opción está seleccionada actualmente
  const [activeTab, setActiveTab] = useState('');

  // Función para manejar el clic en "Favorites"
  const handleFavoritesClick = () => {
    setActiveTab('favorites');
    const mainContent = document.querySelector('.overflow-y-auto');
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Función para manejar el clic en "All Contacts"
  const handleAllContactsClick = () => {
    setActiveTab('all');
    const allContactsSection = document.getElementById('all-contacts-section') || 
                               document.querySelector('.all-contacts-list');
    
    if (allContactsSection) {
      allContactsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const mainContent = document.querySelector('.overflow-y-auto');
      if (mainContent) {
        mainContent.scrollTo({ top: 400, behavior: 'smooth' });
      }
    }
  };

  return (
    // CAMBIO: hidden por defecto, flex solo en pantallas medianas (md)
    <aside className="hidden md:flex md:w-64 border-r border-gray-200 bg-white flex-col shrink-0 h-screen">
      {/* ... resto de tu código igual ... */}
      <div className="p-6 flex items-center gap-3">
         <div className="bg-[#137fec] size-10 rounded-lg flex items-center justify-center text-white">
           <span className="material-symbols-outlined">contacts</span>
         </div>
         <div>
           <h1 className="font-bold text-lg">AgendaPro</h1>
           <p className="text-xs text-gray-500">Tu Agenda Digital</p>
         </div>
      </div>

      {/* NAVEGACIÓN */}
      <nav className="flex-1 px-4 py-2 space-y-1">
        
        {/* Opción: All Contacts */}
        <div 
          onClick={handleAllContactsClick}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 ${
            activeTab === 'all' 
            ? 'bg-blue-100 text-[#137fec] font-bold scale-105 shadow-sm' 
            : 'text-gray-600'
          }`}
        >
          <span className="material-symbols-outlined">group</span>
          <span>All Contacts</span>
        </div>

        {/* Opción: Favorites */}
        <div 
          onClick={handleFavoritesClick}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 ${
            activeTab === 'favorites' 
            ? 'bg-blue-100 text-[#137fec] font-bold scale-105 shadow-sm' 
            : 'text-gray-600'
          }`}
        >
          <span className="material-symbols-outlined">star</span>
          <span>Favorites</span>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-2">
           {/* Espacio para perfil de usuario */}
        </div>
      </div>
    </aside>
  );
};

