import { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../styles/quill.scss";

function Editor() {
  const editorRef = useRef(null);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", "normal", "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["image", "video", "link"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "size",
    "direction",
    "align",
    "font",
    "color",
    "background",
    "code-block",
    "script",
    "video",
  ];

  return (
    <>
      <ReactQuill
        modules={modules}
        formats={formats}
        theme="snow"
        onChange={(value) => console.log(value)}
        ref={editorRef}
      />
    </>
  );
}

export default Editor;
