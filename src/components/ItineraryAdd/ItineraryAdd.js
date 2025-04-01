import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ItineraryAdd.module.scss";
import StarRating from "../../utils/StartRating";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const serviceMap = {
  0: "trips",
  1: "hotels",
  2: "transports",
};

function ItineraryAdd() {
  const [content, setContent] = useState({
    name: "",
    price: "",
    description: "",
    activities: "",
    img: "",
    type: 0,
  });
  const [editField, setEditField] = useState(null);
  const [tempValues, setTempValues] = useState({ ...content });
  const [errors, setErrors] = useState({});
  const textareaRef = useRef(null);

  const validateInput = (name, value) => {
    const newErrors = {};
    switch (name) {
      case "name": {
        if (!value.trim()) {
          newErrors.name = "Title cannot be empty!";
        }
        break;
      }
      case "price": {
        if (!value.trim()) {
          newErrors.price = "Price cannot be empty!";
        }
        break;
      }
      case "description": {
        if (!value.trim()) {
          newErrors.description = "Description cannot be empty!";
        }
        break;
      }
      case "img": {
        if (!value) {
          newErrors.img = "Please choose image!";
        }
        break;
      }
    }
    return newErrors;
  };

  const activityMap = content.activities ? content.activities.split(",") : [];

  const handleChangeImg = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    const newErrors = validateInput("img", file);
    setErrors((prevErrors) => {
      const updatedErrors = { ...newErrors, prevErrors };
      if (!newErrors.img) {
        delete updatedErrors.img;
      }
      return updatedErrors;
    });
    if (newErrors.img) {
      return;
    }
    const newFile = URL.createObjectURL(file);
    setTempValues((prev) => ({ ...prev, img: newFile }));
  };

  const handleEditActivity = (index) => {
    setEditField(index !== undefined ? `activity_${index}` : "newActivity");
    setTempValues((prev) => ({
      ...prev,
      activities: index !== undefined ? activityMap[index] : "",
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newErrors = validateInput(name, value);
    setErrors((prevErrors) => {
      const updatedErrors = { ...newErrors, ...prevErrors };
      if (!newErrors[name]) {
        delete updatedErrors[name];
      }
      return updatedErrors;
    });
    setTempValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveActivity = (index) => {
    const trimmedValue = tempValues.activities.trim();
    const updatedActivities = [...activityMap];

    if (trimmedValue === "") {
      updatedActivities.splice(index, 1); // Xóa nếu giá trị trống
    } else {
      updatedActivities[index] = trimmedValue; // Cập nhật giá trị
    }

    setContent((prev) => ({
      ...prev,
      activities: updatedActivities.join(","),
    }));
    setEditField(null);
    setTempValues((prev) => ({ ...prev, activities: "" }));
  };

  const handleSaveNewActivity = () => {
    const trimmedValue = tempValues.activities.trim();
    if (trimmedValue === "") return;

    const updatedActivities = [...activityMap, trimmedValue];
    setContent((prev) => ({
      ...prev,
      activities: updatedActivities.join(","),
    }));
    setEditField(null);
    setTempValues((prev) => ({ ...prev, activities: "" }));
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [tempValues.description]);

  const handleOnSave = () => {
    let newErrors = {};

    Object.entries(tempValues).forEach(([name, value]) => {
      const fieldErrors = validateInput(name, value);
      newErrors = { ...newErrors, ...fieldErrors };
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }
    setContent({ ...tempValues });
  };

  return (
    <div className={cx("wrapper")}>
      {/* Name */}
      <div className={cx("name-container")}>
        <input
          className={cx("name-input")}
          type="text"
          name="name"
          placeholder="Name"
          value={tempValues.name}
          onChange={handleInputChange}
        />
        {errors.name && <p className={cx("error-text")}>{errors.name}</p>}
      </div>

      {/* Price */}
      <div className={cx("price-container")}>
        <input
          className={cx("price-input")}
          type="number"
          name="price"
          placeholder="Price"
          value={tempValues.price}
          onChange={handleInputChange}
        />
        {errors.price && <p className={cx("error-text")}>{errors.price}</p>}
      </div>

      <hr />

      {/* Image */}
      <div className={cx("img-container")}>
        <img src={content.img} alt={content.name} />
        <div className={cx("input-container")}>
          <input type="file" onChange={handleChangeImg} />
        </div>
        {errors.img && <p className={cx("error-text")}>{errors.img}</p>}
      </div>

      {/* Description */}
      <div className={cx("description-container")}>
        <textarea
          ref={textareaRef}
          className={cx("description-input")}
          placeholder="Description"
          name="description"
          value={tempValues.description}
          onChange={handleInputChange}
        />
        {errors.description && (
          <p className={cx("error-text")}>{errors.description}</p>
        )}
      </div>

      {/* Ẩn Activities nếu có transports */}
      {tempValues.type !== 2 && (
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
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSaveNewActivity()
                  }
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

      <div className={cx("type-container")}>
        <select
          className={cx("type-select")}
          value={tempValues.type}
          onChange={(e) => setTempValues(e.target.value)}
        >
          {Object.keys(serviceMap).map((key) => (
            <option key={key} value={key}>
              {serviceMap[key]}
            </option>
          ))}
        </select>
      </div>

      {/* Save Button */}
      <div className={cx("save-btn")}>
        <Button large onClick={handleOnSave}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default ItineraryAdd;
