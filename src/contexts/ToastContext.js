import React, { createContext } from 'react';
import { toast } from 'react-toastify';

export const ToastContext = createContext();
export function ToastProvider({ children }) {
  const notify = (msg, type = 'info') => toast[type](msg);
  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
    </ToastContext.Provider>
  );
}
