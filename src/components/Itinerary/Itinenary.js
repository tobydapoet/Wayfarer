import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./Itinerary.module.scss";
import StarRating from "../../utils/StartRating";

const cx = classNames.bind(styles);

const serviceMap = {
  0: "trips",
  1: "hotels",
  2: "transports",
};

function Itinerary({ data, manage }) {
  const [content, setContent] = useState({
    ...data,
    type: data.type in serviceMap ? data.type : 0,
  });
  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const textareaRef = useRef(null);
  console.log(content)

  const activityMap = content.activities ? content.activities.split(",") : [];



  const handleChangeImg = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.warn("Không có file nào được chọn!");
      return;
    }
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      console.error("File không phải là ảnh!");
      return;
    }
    const imgURL = URL.createObjectURL(file);
    setContent((prev) => ({ ...prev, img: imgURL }));
  };

  const handleEditField = (field) => {
    setEditField(field);
    setTempValue(content[field]);
  };

  const handleSaveField = (field) => {
    setContent({ ...content, [field]: tempValue });
    setEditField(null);
  };

  const handleEditActivity = (index) => {
    if (index !== undefined) {
      setEditField(`activity_${index}`);
      setTempValue(activityMap[index]);
    } else {
      setEditField("activities");
    }
  };

  const HandleCancelEdit = () => {
    setContent({ ...content });
    setEditField(null);
    setTempValue("");
  };

  const handleSaveActivity = (index) => {
    const trimmedValue = tempValue.trim();

    const activityArray = content.activities
      ? content.activities.split(",").map((item) => item.trim())
      : [];

    if (trimmedValue === "") {
      activityArray.splice(index, 1);
    } else {
      activityArray[index] = trimmedValue;
    }

    setContent({ ...content, activities: activityArray.join(", ") });

    setTempValue("");
    setEditField(null);
  };

  const handleSaveNewActivity = (index) => {
    const trimmedValue = tempValue.trim();

    if (trimmedValue === "") {
      if (index !== undefined) {
        const updatedActivities = activityMap.filter((_, i) => i !== index);
        setContent({ ...content, activities: updatedActivities.join(",") });
      }
    } else {
      const updatedActivities = [...activityMap];
      if (index !== undefined) {
        updatedActivities[index] = trimmedValue;
      } else {
        updatedActivities.push(trimmedValue);
      }

      setContent({ ...content, activities: updatedActivities.join(",") });
    }

    setTempValue("");
    setEditField(null);
  };

  useEffect(() => {
    if (editField === "description" && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; 
    }
  }, [tempValue, editField]);

  return (
    <div className={cx("wrapper")}>
      {/* Name */}
      <div className={cx("name-container")}>
        {editField === "name" && manage ? (
          <input
            className={cx("name-input")}
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={() => HandleCancelEdit("name")}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveField("name");
              if (e.key === "Escape") HandleCancelEdit("name");
            }}
            autoFocus
          />
        ) : (
          <span
            onClick={() => handleEditField("name")}
            className={cx("name-show")}
          >
            {content.name}
          </span>
        )}
      </div>

      <h4>
        <StarRating rating={content.star} />
      </h4>

      <div className={cx("price-container")}>
        {editField === "price" && manage ? (
          <input
            className={cx("price-input")}
            type="number"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={() => HandleCancelEdit("price")}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveField("price");
              if (e.key === "Escape") HandleCancelEdit("price");
            }}
            autoFocus
          />
        ) : (
          <span
            className={cx("price-show")}
            onClick={() => handleEditField("price")}
          >
            ${content.price}/pax
          </span>
        )}
      </div>

      <hr />
      <div className={cx("img-container")}>
        <img src={content.img} alt={content.name} />
        {manage && (
          <div className={cx("input-container")}>
            <input type="file" onChange={handleChangeImg} />
          </div>
        )}
      </div>

      <div className={cx("description-container")}>
        {editField === "description" && manage ? (
          <textarea
            ref={textareaRef}
            className={cx("description-input")}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={() => HandleCancelEdit("description")}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveField("description");
              if (e.key === "Escape") HandleCancelEdit("description");
            }}
            autoFocus
          />
        ) : (
          <div
            className={cx("description-show")}
            onClick={() => handleEditField("description")}
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
              {editField === "activities" ? (
                <input
                  type="text"
                  className={cx("activities-add-input")}
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  onBlur={() => HandleCancelEdit("activities")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveNewActivity();
                    if (e.key === "Escape") HandleCancelEdit("activities");
                  }}
                  autoFocus
                />
              ) : (
                <FontAwesomeIcon
                  className={cx("add-icon")}
                  icon={faPlus}
                  onClick={() => handleEditActivity()}
                />
              )}
            </div>
          )}
        </div>

        <div className={cx("activities")}>
          {activityMap.map((activity, index) => (
            <div key={index} className={cx("activity")}>
              {editField === `activity_${index}` ? (
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
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
      <div className={cx("type-container")}>
        {editField === "type" ? (
          <select
          className={cx("type-select")}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={() => HandleCancelEdit("type")}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSaveField("type");
            if (e.key === "Escape") HandleCancelEdit("type");
          }}
        >
          {Object.keys(serviceMap).map((key) => (
            <option key={key} value={key} selected={key === tempValue}>
              {serviceMap[key]} 
            </option>
          ))}
        </select>
        ) : (
          <div onClick={() => handleEditField("type")}>
            {serviceMap[content.type]}
          </div>
        )}
      </div>
    </div>
  );
}

export default Itinerary;
