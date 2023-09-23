import React from "react";
import styles from "./Logo.module.scss";

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <div className={styles.logoContainer}>
        <div className={styles.logoText}>TO-SHARE</div>
      </div>
    </div>
  );
};
