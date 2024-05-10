import React, { ReactNode, SetStateAction, Dispatch, useState } from "react";

type MenuNavType = {
  openMenuNav: boolean;
  setOpenMenuNav: Dispatch<SetStateAction<boolean>>;
  openMenu: Dispatch<SetStateAction<boolean>>;
  closeMenu: Dispatch<SetStateAction<boolean>>;
};
export const MenuNavContext = React.createContext<MenuNavType>({
  openMenuNav: false,
  setOpenMenuNav: () => {},
  openMenu: () => {},
  closeMenu: () => {},
});

type MenuNavProviderProps = {
  children: ReactNode;
};
export const MenuNavProvider: React.FC<MenuNavProviderProps> = ({
  children,
}) => {
  const [openMenuNav, setOpenMenuNav] = useState(false);
  const openMenu = () => {
    setOpenMenuNav(true);
    console.log(openMenuNav);
  };
  const closeMenu = () => {
    setOpenMenuNav(false);
  };
  const value = { openMenuNav, openMenu, closeMenu, setOpenMenuNav };
  return (
    <MenuNavContext.Provider value={value}>{children}</MenuNavContext.Provider>
  );
};
