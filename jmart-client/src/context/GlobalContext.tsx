"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

type GlobalContextProps = {
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  search: string;
  setSearch: (value: string) => void;
};

type GlobalProviderProps = {
  children: ReactNode;
};

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  return (
    <GlobalContext.Provider
      value={{ isMenuOpen, openMenu, closeMenu, search, setSearch }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  return context;
};
