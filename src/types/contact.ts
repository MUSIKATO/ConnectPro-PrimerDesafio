/**
 * Interfaz principal que define la estructura de un Contacto en el sistema.
 * Este tipo es utilizado globalmente para garantizar la consistencia de los datos
 * entre la base de datos (JSON), el estado de la App y los componentes.
 */
export interface ContactType {
    /** Identificador único numérico (ID) */
    id: number;
    
    /** Nombre de pila del contacto */
    nombre: string;
    
    /** Apellido o apellidos del contacto */
    apellido: string;
    
    /** Número telefónico (almacenado como string para soportar formatos internacionales) */
    telefono: string;
    
    /** * URL de la imagen de perfil del contacto.
     * El símbolo '?' indica que esta propiedad es opcional.
     */
    imagen?: string; 
    
    /** Estado que indica si el contacto ha sido marcado como favorito */
    favorito: boolean;
}