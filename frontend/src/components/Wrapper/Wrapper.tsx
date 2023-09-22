import React from "react";
import style from "./Wrapper.module.scss";

type Props = {
  children: JSX.Element | JSX.Element[];
};
export const Wrapper = ({ children }: Props) => (
  <div className={style.wrapper}>{children}</div>
);
