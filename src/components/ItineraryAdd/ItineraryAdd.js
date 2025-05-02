import { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ItineraryAdd.module.scss";
import StarRating from "../../utils/StartRating";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { DestinationContext } from "../../contexts/DestinationContext";
import images from "../../assets/images";

const cx = classNames.bind(styles);

function ItineraryAdd() {
  const {
    content,
    editMode,
    tempContent,
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
    handleSaveDestination,
    handleAddServices,
  } = useContext(DestinationContext);
  const textareaRef = useRef(null);
  console.log(tempContent);
  return (
    <div className={cx("wrapper")}>
      {/* Name */}
      <div className={cx("name-container")}>
        <input
          className={cx("name-input")}
          type="text"
          name="name"
          placeholder="Name"
          value={tempContent.name}
          onChange={handleEditField}
        />
        {errors.name && <p className={cx("error-text")}>{errors.name}</p>}
      </div>
      {/* Price */}
      <span className={cx("price-container")}>
        <strong style={{ fontSize: "25px", fontFamily: "themify" }}>$</strong>
        <input
          className={cx("price-input")}
          type="number"
          name="price"
          placeholder="Price"
          value={tempContent.price}
          onChange={handleEditField}
        />
        <strong style={{ fontSize: "25px", fontFamily: "themify" }}>/</strong>
      </span>

      <span className={cx("unit-container")}>
        <input
          className={cx("unit-input")}
          name="unit"
          value={tempContent.unit}
          onChange={handleEditField}
          autoFocus
        />
      </span>
      {(errors.price || errors.unit) && (
        <div className={cx("error-unit-price")}>
          {errors.price && (
            <div className={cx("error-text")}>{errors.price}</div>
          )}
          {errors.unit && <div className={cx("error-text")}>{errors.unit}</div>}
        </div>
      )}
      <hr />
      {/* Image */}
      <div className={cx("img-container")}>
        <img src={tempContent.image || images.noImg} alt={content.name} />

        <div className={cx("input-container")}>
          <input type="file" onChange={handleChangeImg} />
        </div>
        {errors.image && <p className={cx("error-text")}>{errors.image}</p>}
      </div>
      {/* Description */}
      <div className={cx("description-container")}>
        <textarea
          ref={textareaRef}
          className={cx("description-input")}
          placeholder="Description"
          name="description"
          value={tempContent.description}
          onChange={handleEditField}
        />
        {errors.description && (
          <p className={cx("error-text")}>{errors.description}</p>
        )}
      </div>
      {/* Ẩn Activities nếu có transports */}
      {tempContent.type !== "transports" && (
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
                    if (e.key === "Enter") handleSaveActivity();
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
            {content.activities.map((activity, index) => (
              <div key={index} className={cx("activity")}>
                {editMode === `edit-activity` && editActivityIndex === index ? (
                  <input
                    type="text"
                    value={currentActivity}
                    onChange={handleEditActivity}
                    onBlur={() => handleSaveActivity()}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveActivity()}
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
      <div className={cx("type-container")}>
        <select
          className={cx("type-select")}
          value={tempContent.type}
          name="type"
          onChange={handleEditField}
        >
          <option value="trips">Trips</option>
          <option value="hotels">Hotels</option>
          <option value="transports">Transports</option>
        </select>
      </div>
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
