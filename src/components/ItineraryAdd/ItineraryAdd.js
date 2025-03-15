import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ItineraryAdd.module.scss";
import StarRating from "../../utils/StartRating";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function ItineraryAdd({ transports }) {
  const [content, setContent] = useState({});
  const [editField, setEditField] = useState(null);
  const [tempValues, setTempValues] = useState({
    name: "",
    price: "",
    description: "",
    activities: "",
  });
  const textareaRef = useRef(null);

  const activityMap = content.activities ? content.activities.split(",") : [];

  const handleChangeImg = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imgURL = URL.createObjectURL(file);
      setContent((prev) => ({ ...prev, img: imgURL }));
    }
  };

  const handleEditActivity = (index) => {
    setEditField(index !== undefined ? `activity_${index}` : "newActivity");
    setTempValues((prev) => ({
      ...prev,
      activities: index !== undefined ? activityMap[index] : "",
    }));
  };

  const handleSaveActivity = (index) => {
    const trimmedValue = tempValues.activities.trim();
    const updatedActivities = [...activityMap];

    if (trimmedValue === "") {
      updatedActivities.splice(index, 1); // Xóa nếu giá trị trống
    } else {
      updatedActivities[index] = trimmedValue; // Cập nhật giá trị
    }

    setContent((prev) => ({ ...prev, activities: updatedActivities.join(",") }));
    setEditField(null);
    setTempValues((prev) => ({ ...prev, activities: "" }));
  };

  const handleSaveNewActivity = () => {
    const trimmedValue = tempValues.activities.trim();
    if (trimmedValue === "") return;

    const updatedActivities = [...activityMap, trimmedValue];
    setContent((prev) => ({ ...prev, activities: updatedActivities.join(",") }));
    setEditField(null);
    setTempValues((prev) => ({ ...prev, activities: "" }));
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [tempValues.description]);

  // Hàm lưu tất cả giá trị tạm thời vào content khi nhấn Save
  const handleSave = () => {
    setContent((prev) => ({
      ...prev,
      name: tempValues.name,
      price: tempValues.price,
      description: tempValues.description,
    }));
    console.log("Saved Content:", {
      ...content,
      name: tempValues.name,
      price: tempValues.price,
      description: tempValues.description,
      activities: content.activities,
    });
  };

  return (
    <div className={cx("wrapper")}>
      {/* Name */}
      <div className={cx("name-container")}>
        <input
          className={cx("name-input")}
          type="text"
          placeholder="Name"
          value={tempValues.name}
          onChange={(e) =>
            setTempValues((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>

      {/* Price */}
      <div className={cx("price-container")}>
        <input
          className={cx("price-input")}
          type="number"
          placeholder="Price"
          value={tempValues.price}
          onChange={(e) =>
            setTempValues((prev) => ({ ...prev, price: e.target.value }))
          }
        />
      </div>

      <hr />

      {/* Image */}
      <div className={cx("img-container")}>
        <img src={content.img} alt={content.name} />
        <div className={cx("input-container")}>
          <input type="file" onChange={handleChangeImg} />
        </div>
      </div>

      {/* Description */}
      <div className={cx("description-container")}>
        <textarea
          ref={textareaRef}
          className={cx("description-input")}
          placeholder="Description"
          value={tempValues.description}
          onChange={(e) =>
            setTempValues((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>

      {/* Ẩn Activities nếu có transports */}
      {!transports && (
        <div className={cx("activities-wrapper")}>
          <div className={cx("activities-header")}>
            <div className={cx("activities-title")}>Activities:</div>
            <div className={cx("activities-add")}>
              {editField === "newActivity" && (
                <input
                  type="text"
                  className={cx("activities-add-input")}
                  value={tempValues.activities}
                  onChange={(e) =>
                    setTempValues((prev) => ({
                      ...prev,
                      activities: e.target.value,
                    }))
                  }
                  onBlur={handleSaveNewActivity}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveNewActivity()}
                  autoFocus
                />
              )}
              {editField !== "newActivity" && (
                <FontAwesomeIcon
                  className={cx("add-icon")}
                  icon={faPlus}
                  onClick={() => handleEditActivity()}
                />
              )}
            </div>
          </div>

          <div className={cx("activities")}>
            {activityMap.map((activity, index) => (
              <div key={index} className={cx("activity")}>
                {editField === `activity_${index}` ? (
                  <input
                    type="text"
                    value={tempValues.activities}
                    onChange={(e) =>
                      setTempValues((prev) => ({
                        ...prev,
                        activities: e.target.value,
                      }))
                    }
                    onBlur={() => handleSaveActivity(index)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleSaveActivity(index)
                    }
                    autoFocus
                  />
                ) : (
                  <span onClick={() => handleEditActivity(index)}>
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
        <Button large onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default ItineraryAdd;