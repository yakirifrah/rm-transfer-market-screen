import { createContext } from 'react';
import { GlobalStore } from '../stores/globalStore';

export const RootContext = createContext();
export const RootProvider = ({ children }) => (
  <RootContext.Provider value={{ ...new GlobalStore() }}>{children}</RootContext.Provider>
);
