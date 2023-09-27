import React from "react";
import ReactQuill from "react-quill";
import { ABOUT_US_TEXT } from "./data";
import { Container } from "../../components/Container/Container";
import styles from "./AboutUs.module.scss";

const AboutUs = () => {
  return (
    <Container className={styles.aboutUsContainer}>
      <ReactQuill
        theme="snow"
        readOnly
        modules={{ toolbar: false }}
        value={ABOUT_US_TEXT}
      />
    </Container>
  );
};

export default AboutUs;
