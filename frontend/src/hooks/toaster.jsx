import { useEffect, useState } from 'react';

const useToaster = () => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message) => {
        const id = Date.now();
        setToasts([...toasts, { id, message }]);
        setTimeout(() => {
            setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
        }, 2000); // Toast will disappear after 2 seconds
    };

    const ToastContainer = () => (
        <div className="absolute bottom-4 right-4 h-0 md:top-4 md:right-auto md:left-1/2 md:transform md:-translate-x-1/2 space-y-2">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className="bg-gray-800 text-white px-4 py-2 rounded shadow-lg"
                >
                    {toast.message}
                </div>
            ))}
        </div>
    );

    return {addToast, ToastContainer};
};

export default useToaster;