import { useContext, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./Itinerary.module.scss";
import StarRating from "../../utils/StartRating";
import { DestinationContext } from "../../contexts/DestinationContext";
import { useParams } from "react-router-dom";

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
  const textareaRef = useRef(null);

  useEffect(() => {
    if (editMode === "description" && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content, editMode]);
  console.log(content.activities);

  return (
    <div className={cx("wrapper")}>
      {/* Name */}
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
            {errors.name && <p className={cx("error-text")}>{errors.name}</p>}
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

      <h4>
        <StarRating rating={content.star} />
      </h4>

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
          {errors.unit && <div className={cx("error-text")}>{errors.unit}</div>}
        </div>
      )}

      <hr />
      <div className={cx("img-container")}>
        <img src={content.image} alt={content.name} />
        {manage && (
          <>
            <div className={cx("input-container")}>
              <input type="file" onChange={handleChangeImg} />
            </div>
            {errors.image && <p className={cx("error-text")}>{errors.image}</p>}
          </>
        )}
      </div>

      <div className={cx("description-container")}>
        {editMode === "description" && manage ? (
          <>
            <textarea
              ref={textareaRef}
              className={cx("description-input")}
              value={content.description}
              name="description"
              onChange={handleEditField}
              onBlur={() => HandleCancelEdit("description")}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleUpdateService();
                if (e.key === "Escape") HandleCancelEdit("description");
              }}
              autoFocus
            />
            {errors.description && (
              <p className={cx("error-text")}>{errors.description}</p>
            )}
          </>
        ) : (
          <div
            className={cx("description-show")}
            onClick={() => handleEditMode("description")}
          >
            {content.description}
          </div>
        )}
      </div>

      {/* Activities */}
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
      {manage && (
        <div className={cx("type-container")}>
          {editMode === "type" ? (
            <select
              className={cx("type-select")}
              value={content.type}
              onChange={handleEditField}
              name="type"
              onBlur={() => HandleCancelEdit("type")}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleUpdateService();
                if (e.key === "Escape") HandleCancelEdit("type");
              }}
            >
              <option value="trips">Trips</option>
              <option value="hotels">Hotels</option>
              <option value="transports">Transports</option>
            </select>
          ) : (
            <div onClick={() => handleEditMode("type")}>{content.type}</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Itinerary;
