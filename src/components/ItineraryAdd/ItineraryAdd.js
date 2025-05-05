import { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ItineraryAdd.module.scss";
import StarRating from "../../utils/StartRating";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { DestinationContext } from "../../contexts/DestinationContext";
import images from "../../assets/images";
import { Editor } from "@tinymce/tinymce-react";

const cx = classNames.bind(styles);

function ItineraryAdd() {
  const {
    content,
    editMode,
    errors,
    currentActivity,
    editActivityIndex,
    handleEditField,
    HandleCancelEdit,
    handleChangeImg,
    handleEditActivityMode,
    handleEditActivity,
    handleSaveActivityOnAdd,
    handleAddServices,
  } = useContext(DestinationContext);
  const textareaRef = useRef(null);
  console.log(content);
  return (
    <div className={cx("wrapper")}>
      {/* Name */}
      <div className={cx("header")}>
        <div className={cx("left-side")}>
          <div className={cx("name-container")}>
            <input
              className={cx("name-input")}
              type="text"
              name="name"
              placeholder="Name"
              value={content.name}
              onChange={handleEditField}
            />
            {errors.name && <p className={cx("error-text")}>{errors.name}</p>}
          </div>
          {/* Price */}
          <span className={cx("price-container")}>
            <strong style={{ fontSize: "25px", fontFamily: "themify" }}>
              $
            </strong>
            <input
              className={cx("price-input")}
              type="number"
              name="price"
              placeholder="Price"
              value={content.price}
              onChange={handleEditField}
            />
            <strong style={{ fontSize: "25px", fontFamily: "themify" }}>
              /
            </strong>
          </span>

          <span className={cx("unit-container")}>
            <input
              className={cx("unit-input")}
              name="unit"
              value={content.unit}
              onChange={handleEditField}
              autoFocus
            />
          </span>
          {(errors.price || errors.unit) && (
            <div className={cx("error-unit-price")}>
              {errors.price && (
                <div className={cx("error-text")}>{errors.price}</div>
              )}
              {errors.unit && (
                <div className={cx("error-text")}>{errors.unit}</div>
              )}
            </div>
          )}
        </div>
        <div className={cx("right-side")}>
          <div className={cx("img-container")}>
            <img src={content.image || images.noImg} alt={content.name} />

            <div className={cx("input-container")}>
              <input type="file" onChange={handleChangeImg} />
            </div>
          </div>
          {errors.image && (
            <p className={cx("error-text-image")}>{errors.image}</p>
          )}
        </div>
      </div>
      <hr />
      {/* Image */}

      {/* Description */}
      <div className={cx("description-container")}>
        {/* <textarea
          ref={textareaRef}
          className={cx("description-input")}
          placeholder="Description"
          name="description"
          value={content.description}
          onChange={handleEditField}
        /> */}
        <Editor
          apiKey="wtgpv9fxlawe92pv114hejtf6xelqkledfwcbnu6tb4ldrhv"
          name="context"
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
            min_height: 500,
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
          value={content.description}
          onEditorChange={(value) => {
            handleEditField({
              target: {
                name: "description",
                value: value,
              },
            });
          }}
        />
        {errors.description && (
          <p className={cx("error-text")}>{errors.description}</p>
        )}
      </div>
      {/* Ẩn Activities nếu có transports */}
      {content.type !== "transports" && (
        <div className={cx("activities-wrapper")}>
          <div className={cx("activities-header")}>
            <div className={cx("activities-title")}> Activities:</div>

            <div className={cx("activities-add")}>
              {editMode === "add-activity" ? (
                <input
                  type="text"
                  className={cx("activities-add-input")}
                  value={currentActivity}
                  onChange={handleEditActivity}
                  onBlur={() => HandleCancelEdit("activities")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveActivityOnAdd();
                    if (e.key === "Escape") HandleCancelEdit("activities");
                  }}
                  autoFocus
                />
              ) : (
                <FontAwesomeIcon
                  className={cx("add-icon")}
                  icon={faPlus}
                  onClick={() => handleEditActivityMode()}
                />
              )}
            </div>
          </div>

          <div className={cx("activities")}>
            {Array.isArray(content.activities) &&
              content.activities.length > 0 &&
              content.activities.map((activity, index) => (
                <div key={index} className={cx("activity")}>
                  {editMode === `edit-activity` &&
                  editActivityIndex === index ? (
                    <input
                      type="text"
                      value={currentActivity}
                      onChange={handleEditActivity}
                      onBlur={() => handleSaveActivityOnAdd()}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSaveActivityOnAdd()
                      }
                      autoFocus
                    />
                  ) : (
                    <span onClick={() => handleEditActivityMode(index)}>
                      {activity}
                    </span>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className={cx("save-btn")}>
        <Button large onClick={() => handleAddServices()}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default ItineraryAdd;
