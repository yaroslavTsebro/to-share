import React, { useState } from "react";
import styles from "./Header.module.scss";
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
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
        <div className={styles.headerUsername}>Mock name</div>
        <Menu className={styles.headerMenu}>
          <CSSTransition
            in={!isSmall || isNavVisible}
            timeout={350}
            classNames={{
              enter: styles.menuAnimationsEnter,
              enterActive: styles.menuAnimationsEnterActive,
              exit: styles.menuAnimationsExit,
              exitActive: styles.menuAnimationsExitActive,
            }}
            unmountOnExit
          >
            <ul className={styles.menuList}>
              <NavLink href="#href1" title="Blog" />
              <NavLink href="#href2" title="Projects" />
              <NavLink href="#href3" title="About" />
            </ul>
          </CSSTransition>
        </Menu>
        <>{isSmall && <button className={styles.headerBurger} onClick={toggleNav}>🍔</button>}</>
      </Container>
    </header>
  );
}

export default Header;
