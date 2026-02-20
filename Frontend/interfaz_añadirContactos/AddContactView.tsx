import { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';
import type { ContactType } from '../types/contact';
import { countryList, type Country } from '../data/countries';

interface AddContactProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (nuevoContacto: Omit<ContactType, 'id' | 'favorito'>) => void;
}

export const AddContactView = ({ isOpen, onClose, onSave }: AddContactProps) => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [selectedCountry, setSelectedCountry] = useState<Country>(countryList.find(c => c.code === '+34') || countryList[0]);
    const [telefono, setTelefono] = useState('');
    const [errorTelefono, setErrorTelefono] = useState('');

    if (!isOpen) return null;

    // Si cambiamos de país, limpiamos el teléfono para evitar que queden formatos viejos
    const handleCountryChange = (country: Country) => {
        setSelectedCountry(country);
        setTelefono('');
        setErrorTelefono('');
    };

    // Filtrar para que solo acepte números
    const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const soloNumeros = e.target.value.replace(/\D/g, ''); // Remueve cualquier letra o símbolo
        setTelefono(soloNumeros);
        setErrorTelefono(''); // Limpia el error al escribir
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nombre.trim() || !telefono.trim()) return;

        // VALIDACIÓN: Verificamos que el número tenga la longitud exacta requerida
        if (telefono.length < selectedCountry.maxLength) {
            setErrorTelefono(`El número debe tener ${selectedCountry.maxLength} dígitos para ${selectedCountry.name}.`);
            return;
        }

        const telefonoCompleto = `${selectedCountry.code} ${telefono}`;
        onSave({
            nombre,
            apellido,
            telefono: telefonoCompleto
        });

        // Limpiar campos
        setNombre('');
        setApellido('');
        setTelefono('');
        setErrorTelefono('');
        setSelectedCountry(countryList.find(c => c.code === '+34') || countryList[0]);
        onClose();
    };

    return (
        <div className="min-h-screen w-full bg-white overflow-y-auto animate-in fade-in duration-300 fixed inset-0 z-50">
            <div className="min-h-screen flex flex-col text-slate-900 font-sans">

                <header className="w-full px-8 py-6 border-b border-gray-200 bg-white">
                    <div className="max-w-3xl mx-auto flex items-center">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex items-center gap-2 text-slate-500 hover:text-[#137fec] transition-colors group outline-none"
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                            <span className="font-medium text-sm">Volver a contactos</span>
                        </button>
                    </div>
                </header>

                <main className="flex-1 flex flex-col items-center justify-start pt-16 px-6 pb-20">
                    <div className="w-full max-w-xl">

                        <div className="text-center mb-10">
                            <div className="inline-flex items-center justify-center size-16 bg-[#137fec]/10 rounded-2xl mb-6">
                                <span className="material-symbols-outlined text-[#137fec] text-3xl">person_add</span>
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Añadir Nuevo Contacto</h1>
                            <p className="text-slate-500 mt-2 text-lg">Introduce los detalles del nuevo contacto para tu agenda.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="nombre" className="text-sm font-semibold text-slate-700 ml-1">Nombre</label>
                                    <input
                                        id="nombre" type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)}
                                        className="w-full bg-slate-50 border border-gray-200 rounded-xl px-5 py-4 text-base focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] transition-all placeholder:text-slate-400 outline-none"
                                        placeholder="Nombre del contacto"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="apellido" className="text-sm font-semibold text-slate-700 ml-1">Apellido</label>
                                    <input
                                        id="apellido" type="text" value={apellido} onChange={(e) => setApellido(e.target.value)}
                                        className="w-full bg-slate-50 border border-gray-200 rounded-xl px-5 py-4 text-base focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] transition-all placeholder:text-slate-400 outline-none"
                                        placeholder="Apellido del contacto"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <label className="text-sm font-semibold text-slate-700 ml-1">Número de teléfono</label>
                                    {/* CONTADOR DE DÍGITOS */}
                                    <span className={`text-xs font-medium ${telefono.length === selectedCountry.maxLength ? 'text-green-600' : 'text-slate-400'}`}>
                                        {telefono.length} / {selectedCountry.maxLength} dígitos
                                    </span>
                                </div>
                                <div className="flex gap-4 items-start relative">

                                    {/* DROPDOWN DE PAÍSES */}
                                    <div className="w-40 shrink-0 relative">
                                        <Listbox value={selectedCountry} onChange={handleCountryChange}>
                                            <div className="relative mt-1">
                                                <Listbox.Button className="relative w-full cursor-default rounded-xl bg-slate-50 py-4 pl-4 pr-10 text-left border border-gray-200 focus:outline-none focus-visible:border-[#137fec] focus-visible:ring-2 focus-visible:ring-white/75 sm:text-sm transition-all h-[58px] flex items-center">
                                                    <span className="flex items-center truncate pointer-events-none">
                                                        <img
                                                            src={`https://flagcdn.com/w40/${selectedCountry.iso}.png`}
                                                            alt={selectedCountry.name}
                                                            className="w-6 h-4 object-cover mr-3 shrink-0 rounded-sm shadow-sm"
                                                        />
                                                        <span className="text-base font-medium text-slate-700 block truncate">{selectedCountry.code}</span>
                                                    </span>
                                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                        <ChevronUpDownIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
                                                    </span>
                                                </Listbox.Button>

                                                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                                    <Listbox.Options className="absolute mt-1 max-h-60 w-[280px] overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50">
                                                        {countryList.map((country, countryIdx) => (
                                                            <Listbox.Option
                                                                key={countryIdx}
                                                                className={({ active }) =>
                                                                    `relative cursor-default select-none py-3 pl-4 pr-4 ${active ? 'bg-[#137fec]/10 text-[#137fec]' : 'text-slate-900'}`
                                                                }
                                                                value={country}
                                                            >
                                                                {({ selected }) => (
                                                                    <div className="flex items-center justify-between">
                                                                        <div className="flex items-center truncate">
                                                                            <img src={`https://flagcdn.com/w40/${country.iso}.png`} alt={country.name} className="w-6 h-4 object-cover mr-3 shrink-0 rounded-sm shadow-sm" />
                                                                            <span className={`block truncate font-medium ${selected ? 'font-bold' : 'font-normal'}`}>{country.name}</span>
                                                                        </div>
                                                                        <div className="flex items-center pl-2">
                                                                            <span className={`text-sm mr-2 ${selected ? 'text-[#137fec] font-bold' : 'text-slate-500'}`}>{country.code}</span>
                                                                            {selected ? <span className="text-[#137fec]"><CheckIcon className="h-5 w-5" aria-hidden="true" /></span> : null}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </Listbox>
                                    </div>

                                    {/* INPUT DE TELÉFONO */}
                                    <div className="relative flex-1">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">call</span>
                                        <input
                                            id="telefono"
                                            type="tel"
                                            required
                                            value={telefono}
                                            onChange={handleTelefonoChange}
                                            maxLength={selectedCountry.maxLength} // <-- RESTIRCCIÓN DE LONGITUD
                                            className={`w-full bg-slate-50 border ${errorTelefono ? 'border-red-400 focus:ring-red-400/50 focus:border-red-500' : 'border-gray-200 focus:ring-[#137fec]/50 focus:border-[#137fec]'} rounded-xl pl-12 pr-4 py-4 text-base focus:ring-2 transition-all placeholder:text-slate-400 outline-none h-[58px]`}
                                            placeholder={`Ej: ${'9'.repeat(selectedCountry.maxLength)}`}
                                        />
                                    </div>
                                </div>
                                {/* MENSAJE DE ERROR */}
                                {errorTelefono && <p className="text-red-500 text-sm mt-1 ml-1 font-medium">{errorTelefono}</p>}
                            </div>

                            <div className="pt-6 flex items-center gap-4">
                                <button
                                    type="button" onClick={onClose}
                                    className="flex-1 px-6 py-4 rounded-xl bg-slate-100 text-base font-bold text-slate-600 hover:bg-slate-200 transition-all text-center outline-none focus:ring-2 focus:ring-slate-300"
                                >
                                    Descartar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-[2] bg-[#137fec] hover:bg-blue-600 text-white px-6 py-4 rounded-xl font-bold text-base shadow-xl shadow-[#137fec]/20 transition-all flex items-center justify-center gap-2 outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <span className="material-symbols-outlined">save</span>
                                    Guardar Contacto
                                </button>
                            </div>
                        </form>

                    </div>
                </main>
            </div>
        </div>
    );
};