import classNames from "classnames/bind";
import { Editor } from "@tinymce/tinymce-react";
import styles from "./BlogAdd.module.scss";
import Button from "../Button";
import Input from "../Input";
import images from "../../assets/images";
import { useLocation } from "react-router-dom";
import { BlogContext } from "../../contexts/BlogContext";
import { useContext } from "react";

const cx = classNames.bind(styles);

function BlogAdd() {
  const {
    blogData,
    errors,
    user,
    handleInputChange,
    handleImgChange,
    handleCreateBlog,
  } = useContext(BlogContext);

  const location = useLocation();
  const isBlogInfo = location.pathname.includes("/blogs/");
  return (
    <div className={cx("wrapper", { clientInterface: isBlogInfo })}>
      <div className={cx("header")}>
        <div className={cx("left-side")}>
          <Input
            dark
            name="title"
            placeholder="Title..."
            className={cx("title")}
            value={blogData?.title || ""}
            error={errors.title}
            onChange={handleInputChange}
          />
          <div className={cx("owner")}>By: {blogData.createdBy} </div>
          <div className={cx("created-time")}>
            At: {new Date(blogData.createdAt).toLocaleDateString()}
          </div>
        </div>
        <div className={cx("right-side")}>
          <div className={cx("theme-txt")}>Theme</div>
          <div className={cx("img-container")}>
            <img src={blogData.image || images.noImg} />
            <div className={cx("input-container")}>
              <input type="file" onChange={handleImgChange} />
            </div>
          </div>
          {errors.image && (
            <div className={cx("error-text-image")}>{errors.image}</div>
          )}
        </div>
      </div>
      <hr></hr>
      <div className={cx("body")}>
        <Editor
          apiKey="wtgpv9fxlawe92pv114hejtf6xelqkledfwcbnu6tb4ldrhv"
          init={{
            plugins: [
              "lists",
              "link",
              "image",
              "table",
              "media",
              "autolink",
              "emoticons",
              "autoresize",
            ],

            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            image_title: true,
            automatic_uploads: true,
            min_height: 800,
            // images_upload_url: "/upload-images", // Set your own image upload API endpoint
            file_picker_callback: (callback, value, meta) => {
              if (meta.filetype === "image") {
                const input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");
                input.click();

                input.onchange = () => {
                  const file = input.files[0];
                  const reader = new FileReader();
                  reader.onload = () => {
                    callback(reader.result, { alt: file.name });
                  };
                  reader.readAsDataURL(file);
                };
              }
            },
            statusbar: false,
            menubar: false,
          }}
          value={blogData.content}
          onEditorChange={(content) => {
            handleInputChange({
              target: {
                name: "content",
                value: content,
              },
            });
          }}
        />
        {errors.content && (
          <div className={cx("error-text")}>{errors.content}</div>
        )}
      </div>
      <div className={cx("btn-container")}>
        <Button rounded onClick={() => handleCreateBlog()}>
          Apply
        </Button>
      </div>
    </div>
  );
}

export default BlogAdd;
