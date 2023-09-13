import React from "react";
import Editor from "../../components/Editor/Editor";
import styles from "./EditPost.module.scss";

const EditPost = () => {
  return (
    <section className={styles.container}>
      <form action="">
        <label className={styles.title} htmlFor="title">Title</label>
        <input className={styles.titleInput} type="text" name="title" />
        <Editor />
      </form>
    </section>
  );
};

export default EditPost;
