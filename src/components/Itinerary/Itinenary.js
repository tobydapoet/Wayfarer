import { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPersonWalkingArrowRight,
  faPlus,
  faShare,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Itinerary.module.scss";
import StarRating from "../../utils/StartRating";
import { DestinationContext } from "../../contexts/DestinationContext";
import { Editor } from "@tinymce/tinymce-react";
import images from "../../assets/images";
import Button from "../Button";
import ScheduleModal from "../ScheduleModal/ScheduleModal";
import { ScheduleProvider } from "../../contexts/ScheduleContext";
import { useLocation, useParams } from "react-router-dom";
import { FeedBackContext } from "../../contexts/FeedbackContext";
import { BillContext } from "../../contexts/BillContext";
import { DestinationFavouriteContext } from "../../contexts/DestinationFavouriteContext";

const cx = classNames.bind(styles);

function Itinerary({ manage }) {
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
    handleEditMode,
    handleEditActivity,
    handleSaveActivity,
    handleUpdateService,
    handleCancelActivity,
  } = useContext(DestinationContext);

  const [openScheduleForm, setOpenScheduleForm] = useState(false);
  const location = useLocation().pathname;
  const { handleCalculateRating } = useContext(FeedBackContext);
  const { handleCalculateClient } = useContext(BillContext);
  const {
    handleToggleDestinationFavourite,
    allDestinationFavourite,
    isFavourite,
  } = useContext(DestinationFavouriteContext);

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("header")}>
          <div className={cx("left-side")}>
            <div className={cx("name-container")}>
              {editMode === "name" && manage ? (
                <>
                  <input
                    className={cx("name-input")}
                    type="text"
                    value={content.name}
                    name="name"
                    onChange={handleEditField}
                    onBlur={() => HandleCancelEdit("name")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleUpdateService();
                      if (e.key === "Escape") HandleCancelEdit("name");
                    }}
                    autoFocus
                  />
                  {errors.name && (
                    <p className={cx("error-text")}>{errors.name}</p>
                  )}
                </>
              ) : (
                <span
                  onClick={() => handleEditMode("name")}
                  className={cx("name-show")}
                >
                  {content.name}
                </span>
              )}
            </div>

            <div className={cx("calculate")}>
              <div className={cx("star")}>
                <div>{`${handleCalculateRating(content._id)}`}</div>
                <FontAwesomeIcon
                  icon={faStar}
                  color="#FFD700"
                  className={cx("star-icon")}
                />
              </div>

              <div className={cx("num")}>
                <div>{`${handleCalculateClient(content._id)}`}</div>
                <FontAwesomeIcon icon={faPersonWalkingArrowRight} />
              </div>

              <div className={cx("favourite")}>
                <div>
                  {
                    allDestinationFavourite.filter((fav) => {
                      const favDestinationId =
                        typeof fav.destinationId === "string"
                          ? fav.destinationId
                          : fav.destinationId?._id;
                      return favDestinationId === content._id;
                    }).length
                  }
                </div>

                <FontAwesomeIcon icon={faHeart} color="red" />
              </div>
            </div>

            <span className={cx("price-container")}>
              {editMode === "price" && manage ? (
                <>
                  <strong style={{ fontSize: "25px", fontFamily: "themify" }}>
                    $
                  </strong>
                  <input
                    className={cx("price-input")}
                    type="number"
                    name="price"
                    value={content.price}
                    onChange={handleEditField}
                    onBlur={() => HandleCancelEdit("price")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleUpdateService();
                      if (e.key === "Escape") HandleCancelEdit("price");
                    }}
                    autoFocus
                  />
                  <strong style={{ fontSize: "25px", fontFamily: "themify" }}>
                    /
                  </strong>
                </>
              ) : (
                <span
                  className={cx("price-show")}
                  onClick={() => handleEditMode("price")}
                >
                  ${content.price}/
                </span>
              )}
            </span>

            <span className={cx("unit-container")}>
              {editMode === "unit" && manage ? (
                <>
                  <input
                    className={cx("unit-input")}
                    name="unit"
                    value={content.unit}
                    onChange={handleEditField}
                    onBlur={() => HandleCancelEdit("unit")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleUpdateService();
                      if (e.key === "Escape") HandleCancelEdit("unit");
                    }}
                    autoFocus
                  />
                </>
              ) : (
                <span
                  className={cx("unit-show")}
                  onClick={() => handleEditMode("unit")}
                >
                  {content.unit}
                </span>
              )}
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
            {manage && (
              <div className={cx("img-container")}>
                <img src={content.image || images.noImg} alt={content.name} />

                <>
                  <div className={cx("input-container")}>
                    <input type="file" onChange={handleChangeImg} />
                  </div>
                  {errors.image && (
                    <p className={cx("error-text")}>{errors.image}</p>
                  )}
                </>
              </div>
            )}
            {!manage && (
              <div className={cx("client-ffc")}>
                <FontAwesomeIcon
                  icon={faHeart}
                  className={cx("favourite-icon", {
                    isActive: isFavourite(content._id),
                  })}
                  onClick={(e) => {
                    const icon = e.currentTarget;
                    icon.classList.add(styles.shrink);
                    setTimeout(() => icon.classList.remove(styles.shrink), 100);
                    handleToggleDestinationFavourite(content._id);
                  }}
                />
                <FontAwesomeIcon
                  icon={faShare}
                  className={cx("share-icon")}
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <hr className={cx("gap-line")} />

        <div className={cx("content")}>
          <div className={cx("description-container")}>
            {editMode === "description" && manage ? (
              <>
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
                    setup: (editor) => {
                      editor.on("keydown", (e) => {
                        if (e.key === "Enter" && e.shiftKey) {
                          return;
                        }
                        if (e.key === "Enter") {
                          e.preventDefault();
                          document.getElementById("saveButton").click();
                        }
                        if (e.key === "Escape") {
                          HandleCancelEdit("description");
                        }
                      });
                      editor.on("blur", () => {
                        HandleCancelEdit("description");
                      });
                    },
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
                <button
                  id="saveButton"
                  style={{ display: "none" }}
                  onClick={() => handleUpdateService()}
                >
                  Save
                </button>
                {errors.description && (
                  <p className={cx("error-text")}>{errors.description}</p>
                )}
              </>
            ) : (
              <div
                className={cx("description-show")}
                onClick={() => handleEditMode("description")}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: content.description }}
                />
              </div>
            )}
          </div>

          <div className={cx("activities-wrapper")}>
            <div className={cx("activities-header")}>
              <div className={cx("activities-title")}> Activities:</div>
              {manage && (
                <div className={cx("activities-add")}>
                  {editMode === "add-activity" ? (
                    <input
                      type="text"
                      className={cx("activities-add-input")}
                      value={currentActivity}
                      onChange={handleEditActivity}
                      onBlur={() => handleCancelActivity()}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveActivity();
                        if (e.key === "Escape") handleCancelActivity();
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
              )}
            </div>

            <div className={cx("activities")}>
              {Array.isArray(content.activities) &&
                content.activities.map((activity, index) => (
                  <div key={index} className={cx("activity")}>
                    {editMode === `edit-activity` &&
                    editActivityIndex === index &&
                    manage ? (
                      <input
                        type="text"
                        value={currentActivity}
                        onChange={handleEditActivity}
                        onBlur={() => handleCancelActivity()}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveActivity();
                          if (e.key === "Escape") handleCancelActivity();
                        }}
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
          {location.includes("/manage/") && (
            <div className={cx("btn-container")}>
              <Button rounded onClick={() => setOpenScheduleForm(true)}>
                Set schedule!
              </Button>
            </div>
          )}
        </div>
      </div>
      <ScheduleProvider>
        <ScheduleModal
          open={openScheduleForm}
          onClose={() => setOpenScheduleForm(false)}
        />
      </ScheduleProvider>
    </>
  );
}

export default Itinerary;
