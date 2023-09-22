import React from "react";
import style from "./Container.module.scss";

interface Props {
  className?: string;
  children: JSX.Element | JSX.Element[];
}

export const Container: React.FC<Props> = ({ className, children }) => {
  const classes = `${style.container} ${className || ""}`;

  return <div className={classes}>{children}</div>;
};
