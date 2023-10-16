import React, { ChangeEvent, useState } from "react";
import Editor from "../../components/Editor/Editor";
import styles from "./EditPost.module.scss";

const EditPost = () => {
  const [images, setImages] = useState<string[]>([]);

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      const urlArray = selectedFiles.map((file) => URL.createObjectURL(file));
      setImages(urlArray);
    }
  };

  return (
    <section className={styles.container}>
      <form action="">
        <input
          className={styles.titleInput}
          type="text"
          name="title"
          placeholder="Enter your title"
        />
        {images.length > 0 &&
          images.map((item, i) => {
            return <img alt={`preview ${i}`} src={item} key={i} />;
          })}
        <input
          className={styles.titleImageInput}
          type="file"
          onChange={onImageChange}
          multiple
          name="image"
        />
        <textarea
          name="description"
          cols={100}
          rows={10}
          maxLength={500}
          placeholder="Article description"
          className={styles.descriptionTextArea}
        ></textarea>
        <Editor />
      </form>
    </section>
  );
};

export default EditPost;
