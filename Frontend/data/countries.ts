export interface Country {
    name: string;
    code: string;
    iso: string;
    maxLength: number; // <-- Añadimos esta nueva propiedad
}

export const countryList: Country[] = [
    { name: "España", code: "+34", iso: "es", maxLength: 9 },
    { name: "Estados Unidos", code: "+1", iso: "us", maxLength: 10 },
    { name: "México", code: "+52", iso: "mx", maxLength: 10 },
    { name: "Argentina", code: "+54", iso: "ar", maxLength: 10 },
    { name: "Colombia", code: "+57", iso: "co", maxLength: 10 },
    { name: "Chile", code: "+56", iso: "cl", maxLength: 9 },
    { name: "Perú", code: "+51", iso: "pe", maxLength: 9 },
    { name: "Venezuela", code: "+58", iso: "ve", maxLength: 10 },
    { name: "Ecuador", code: "+593", iso: "ec", maxLength: 9 },
    { name: "Guatemala", code: "+502", iso: "gt", maxLength: 8 },
    { name: "Cuba", code: "+53", iso: "cu", maxLength: 8 },
    { name: "Bolivia", code: "+591", iso: "bo", maxLength: 8 },
    { name: "República Dominicana", code: "+1-809", iso: "do", maxLength: 10 },
    { name: "Honduras", code: "+504", iso: "hn", maxLength: 8 },
    { name: "Paraguay", code: "+595", iso: "py", maxLength: 9 },
    { name: "El Salvador", code: "+503", iso: "sv", maxLength: 8 }, // El Salvador son 8 dígitos
    { name: "Nicaragua", code: "+505", iso: "ni", maxLength: 8 },
    { name: "Costa Rica", code: "+506", iso: "cr", maxLength: 8 },
    { name: "Panamá", code: "+507", iso: "pa", maxLength: 8 },
    { name: "Uruguay", code: "+598", iso: "uy", maxLength: 8 },
    { name: "Reino Unido", code: "+44", iso: "gb", maxLength: 10 },
    { name: "Canadá", code: "+1", iso: "ca", maxLength: 10 },
    { name: "Francia", code: "+33", iso: "fr", maxLength: 9 },
    { name: "Alemania", code: "+49", iso: "de", maxLength: 11 },
    { name: "Italia", code: "+39", iso: "it", maxLength: 10 },
    { name: "Brasil", code: "+55", iso: "br", maxLength: 11 },
    { name: "Portugal", code: "+351", iso: "pt", maxLength: 9 },
    { name: "China", code: "+86", iso: "cn", maxLength: 11 },
    { name: "Japón", code: "+81", iso: "jp", maxLength: 10 },
    { name: "India", code: "+91", iso: "in", maxLength: 10 }
].sort((a, b) => a.name.localeCompare(b.name));