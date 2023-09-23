import React from "react";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import { Container } from "../../components/Container/Container";
import { Logo } from "../../components/Logo/Logo";
import styles from "./MainPage.module.scss";

function MainPage() {
  return (
    <Wrapper>
      <Container>
        <Logo />
      </Container>
    </Wrapper>
  );
}

export default MainPage;
