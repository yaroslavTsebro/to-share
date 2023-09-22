import React from "react";
import style from "./Menu.module.scss";

interface Props {
  className?: string;
  children: JSX.Element | JSX.Element[];
}

export const Menu: React.FC<Props> = ({ className, children }) => {
  const classes = `${style.menu} ${className || ""}`;
  
  return <nav className={classes}>{children}</nav>;
};
