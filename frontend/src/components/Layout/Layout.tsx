import React from "react";
import style from "./Layout.module.scss";
import { Wrapper } from "../Wrapper/Wrapper";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <Wrapper>
        <Header />
        <Outlet />
      </Wrapper>
    </>
  );
};
