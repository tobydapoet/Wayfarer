import classNames from "classnames/bind";
import styles from "./AboutUsEdit.module.scss";
import { useContext, useState } from "react";

import { useParams } from "react-router-dom";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import images from "../../../../assets/images";
import { AboutUsContext } from "../../../../contexts/AboutUsContext";

const cx = classNames.bind(styles);

function AboutUsEdit() {
  const { id } = useParams();
  const {
    content,
    errors,
    size,
    handleCreateContent,
    handleUpdateContent,
    handleChangeImg,
    handleContentChange,
    handleImgLoad,
    handleSaveContent,
  } = useContext(AboutUsContext);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("content-edit-wrapper")}>
        <div className={cx("file-wrapper")}>
          <div className={cx("file-container")}>
            <input
              type="file"
              name={content?.image}
              onChange={(e) => handleChangeImg(e)}
            />
          </div>
          <img
            className={cx(
              size.width < size.height ? "vertical-img" : "horizontal-img"
            )}
            src={content?.image || images.noImg}
            onLoad={(e) => handleImgLoad(e)}
          />
        </div>
        <div className={cx("content-edit-text")}>
          <Input
            dark
            placeholder="Title"
            frame="Title"
            name="title"
            value={content?.title || ""}
            onChange={handleContentChange}
            maxLength={60}
            error={errors.title}
          />
          <Input
            dark
            textarea
            placeholder="Describe..."
            frame="Describe"
            name="describe"
            value={content?.describe || ""}
            onChange={handleContentChange}
            maxLength={700}
            error={errors.describe}
          />
        </div>
      </div>
      <div className={cx("btn-container")}>
        <Button
          large
          onClick={() => {
            if (!id) {
              console.log("Creating content");
              handleCreateContent();
            } else {
              console.log("Saving content");
              handleUpdateContent();
            }
          }}
        >
          Save
        </Button>
        <Button large>Cancel</Button>
      </div>
    </div>
  );
}

export default AboutUsEdit;
