import { useState } from 'react';

/**
 * Componente Sidebar: Gestiona la navegación lateral y el filtrado visual por secciones
 */
export const Sidebar = () => {
  // Estado local para controlar el estilo visual de la pestaña activa
  const [activeTab, setActiveTab] = useState('');

  /**
   * MANEJO DE SCROLL DINÁMICO  favoritos:
   * Utiliza la API de scroll del navegador para llevar al usuario al inicio
   * de la lista de favoritos de forma fluida (smooth).
   */
  const handleFavoritesClick = () => {
    setActiveTab('favorites');
    const mainContent = document.querySelector('.overflow-y-auto');
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /**
   * MANEJO DE SCROLL DINÁMICO contactos normales:
   * Implementa 'scrollIntoView' para localizar el anclaje de la sección general.
   * Proporciona un 'fallback' calculando la posición en píxeles si el ID no se encuentra.
   */
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
    /* DISEÑO RESPONSIVO Y ESTRUCTURA:
       'hidden': Oculta el sidebar en móviles para dar prioridad al contenido.
       'md:flex': Activa el contenedor flex únicamente a partir de pantallas medianas.
       'h-screen' y 'sticky/fixed': Asegura que la navegación siempre esté accesible al hacer scroll.
    */
    <aside className="hidden md:flex md:w-64 border-r border-gray-200 bg-white flex-col shrink-0 h-screen">

      {/* BRANDING: Identidad visual de la aplicación */}
      <div className="p-6 flex items-center gap-3">
        <div className="bg-[#137fec] size-10 rounded-lg flex items-center justify-center text-white shadow-md">
          <span className="material-symbols-outlined">contacts</span>
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight">AgendaPro</h1>
          <p className="text-[10px] text-gray-500 uppercase font-medium">Sistema de Gestión</p>
        </div>
      </div>

      {/* MENÚ DE NAVEGACIÓN:
          Utiliza Template Literals para aplicar clases condicionales basadas en 'activeTab'.
          Implementa efectos de 'scale' y 'shadow' para mejorar la interacción (Affordance).
      */}
      <nav className="flex-1 px-4 py-2 space-y-1">
        
        <div 
          onClick={handleAllContactsClick}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 ${
            activeTab === 'all' 
            ? 'bg-blue-50 text-[#137fec] font-bold scale-105 shadow-sm' 
            : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">group</span>
          <span className="text-sm">Todos los contactos</span>
        </div>

        <div 
          onClick={handleFavoritesClick}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 ${
            activeTab === 'favorites' 
            ? 'bg-yellow-50 text-yellow-600 font-bold scale-105 shadow-sm' 
            : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">star</span>
          <span className="text-sm">Favoritos</span>
        </div>
      </nav>

      {/* FOOTER DEL SIDEBAR: Espacio reservado para acciones de cuenta o perfil */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-2 text-xs text-gray-400 font-medium italic">
           v1.0.0 - Despliegue Final
        </div>
      </div>
    </aside>
  );
};