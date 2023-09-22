import React, { useState } from "react";
import style from "./Header.module.scss";
import { Container } from "../Container/Container";
import { Menu } from "./Menu";
import { CSSTransition } from "react-transition-group";
import { NavLink } from "./NavLink";
import { useWindowWidthAndHeight } from "../../hooks/useWindowWidthAndHeight";

function Header() {
  const [width, height] = useWindowWidthAndHeight();
  const [isNavVisible, setNavVisibility] = useState<boolean>(false);
  const isSmall = width < 600;

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  return (
    <header className={style.header}>
      <Container className={style.headerContainer}>
        <div className={style.headerUsername}>Mock name</div>
        <Menu className={style.headerMenu}>
          <CSSTransition
            in={!isSmall}
            timeout={350}
            classNames={{
              enter: style.menuAnimationsEnter,
              enterActive: style.menuAnimationsEnterActive,
              exit: style.menuAnimationsExit,
              exitActive: style.menuAnimationsExitActive,
            }}
            unmountOnExit
          >
            <ul className={style.menuList}>
              <NavLink href="#href1" title="Blog" />
              <NavLink href="#href2" title="Projects" />
              <NavLink href="#href3" title="About" />
            </ul>
          </CSSTransition>
        </Menu>
        <>{isSmall && <button className={style.headerBurger}>🍔</button>}</>
      </Container>
    </header>
  );
}

export default Header;
