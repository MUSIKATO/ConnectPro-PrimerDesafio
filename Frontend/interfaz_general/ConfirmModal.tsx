interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    confirmColor?: 'red' | 'yellow';
}

export const ConfirmModal = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = "Confirmar",
    confirmColor = 'red'
}: ConfirmModalProps) => {
    if (!isOpen) return null;

    // Clases dinámicas para el botón de confirmación según la acción
    const colorClasses = {
        red: "bg-red-500 hover:bg-red-600 focus:ring-red-500",
        yellow: "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500"
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-500 text-sm">{message}</p>
                </div>
                <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#137fec]"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${colorClasses[confirmColor]}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};