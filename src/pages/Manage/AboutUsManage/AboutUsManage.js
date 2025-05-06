import classNames from "classnames/bind";
import styles from "./AboutUsManage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import Member from "../../../components/Member";
import AboutContentItem from "../../../components/AboutContentItem";
import images from "../../../assets/images";

const cx = classNames.bind(styles);

const CONTENTS = [
  {
    id: 0,
    title: "WE HAVE THE BEST TOURS",
    describe:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis vulputate eros, iaculis consequat nisl. Nunc et suscipit urna. Integer elementum orci eu vehicula pretium. Donec bibendum tristique condimentum. Aenean in lacus ligula. Phasellus euismod gravida eros. Aenean nec ipsum aliquet, pharetra magna id, interdum sapien. Etiam id lorem eu nisl pellentesque semper. Nullam tincidunt metus placerat, suscipit leo ut, tempus nulla. Fusce at eleifend tellus. Ut eleifend dui nunc, non fermentum quam placerat non. Etiam venenatis nibh augue, sed eleifend justo tristique eu",
    image:
      "https://img.freepik.com/free-vector/night-landscape-with-lake-mountains-trees-coast-vector-cartoon-illustration-nature-scene-with-coniferous-forest-river-shore-rocks-moon-stars-dark-sky_107791-8253.jpg",
  },
  {
    id: 1,
    title: "WE HAVE THE BEST TOURS",
    describe:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis vulputate eros, iaculis consequat nisl. Nunc et suscipit urna. Integer elementum orci eu vehicula pretium. Donec bibendum tristique condimentum. Aenean in lacus ligula. Phasellus euismod gravida eros. Aenean nec ipsum aliquet, pharetra magna id, interdum sapien. Etiam id lorem eu nisl pellentesque semper. Nullam tincidunt metus placerat, suscipit leo ut, tempus nulla. Fusce at eleifend tellus. Ut eleifend dui nunc, non fermentum quam placerat non. Etiam venenatis nibh augue, sed eleifend justo tristique eu",
    image:
      "https://www.incredibleasiajourneys.com/uploads/galleries/vietnam-travel-guide-map-QoZ7.jpg",
  },
  {
    id: 2,

    title: "YOU WANT TO JOIN OUR TEAM?",
    describe:
      "If you are interested in joining our team. Please e-mail yourr CV to us. We'll will add you to ourr database and contact you should vacancies arise.",
  },
];
const MEMBERS = [
  {
    name: "Nguyen Tung",
    avatar:
      "https://www.incredibleasiajourneys.com/uploads/galleries/vietnam-travel-guide-map-QoZ7.jpg",
  },
  {
    name: "Nguyen Viet Tung 124e1242343",
    avatar:
      "https://www.incredibleasiajourneys.com/uploads/galleries/vietnam-travel-guide-map-QoZ7.jpg",
  },
];

function AboutUsManage() {
  const [editMember, setEditMember] = useState(false);
  const [members, setmembers] = useState([...MEMBERS]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [tempValueMember, setTempValueMember] = useState(null);
  const [selectedTempContent, setSelectedTempContent] = useState(null);
  const [errors, setErrors] = useState({});

  const validateInput = (name, value) => {
    const newErrors = {};
    switch (name) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Name cannot empty!";
        }
        break;
      case "avatar":
        if (!value.trim()) {
          newErrors.avatar = "Avatar cannot empty!";
        }
        break;
    }
    return newErrors;
  };
  console.log(errors);

  const navigate = useNavigate();

  const handleEditMember = (member) => {
    {
      setSelectedMember(member ? { ...member } : null);
      setTempValueMember(member ? { ...member } : null);
      setEditMember(true);
    }
  };
  const handleCancelMember = () => {
    setSelectedMember(selectedMember);
    setErrors({});
    setEditMember(false);
  };

  const handleSaveMember = () => {
    if (!tempValueMember) {
      setErrors({ name: "Name cannot empty!", avatar: "Avatar cannot empty!" });
      return;
    }

    const newErrors = { ...errors };

    Object.entries(tempValueMember).forEach(([name, value]) => {
      const fieldErrors = validateInput(name, value);
      if (fieldErrors[name]) {
        newErrors[name] = fieldErrors[name];
      } else {
        delete newErrors[name];
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    if (selectedMember) {
      setmembers((prevMembers) =>
        prevMembers.map((member) =>
          member.name === selectedMember.name ? tempValueMember : member
        )
      );
    } else {
      setmembers((prevMembers) => [...prevMembers, tempValueMember]);
    }

    setEditMember(false);
  };

  const handleMemberChange = (e) => {
    const { name, value } = e.target;
    const newErrors = validateInput(name, value);
    setErrors((prevErrors) => {
      const updatedErrors = { ...newErrors, ...prevErrors };
      if (!newErrors[name]) {
        delete updatedErrors[name];
      }
      return updatedErrors;
    });
    setTempValueMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeImg = (e, type) => {
    if (type !== "member") return;

    if (!e.target.files || e.target.files.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        avatar: "Vui lòng chọn một ảnh!",
      }));
      return;
    }

    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        avatar: "Tệp được chọn không phải là ảnh!",
      }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setErrors((prevErrors) => ({ ...prevErrors, avatar: "" }));
      setTempValueMember((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("member-section")}>
          <div className={cx("header")}>
            <div className={cx("add")} onClick={() => handleEditMember(null)}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
          <div className={cx("represent")}>
            {members.map((member, index) => (
              <Member
                data={member}
                key={index}
                manage
                onClick={() => handleEditMember(member)}
              />
            ))}
          </div>
        </div>
        <div className={cx("content-section")}>
          <div className={cx("header")}>
            <div className={cx("add")} onClick={() => navigate("add_content")}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
          <div className={cx("content")} />
          {CONTENTS.map((content, index) => (
            <AboutContentItem
              data={content}
              key={index}
              onClick={() => navigate(content.title)}
            />
          ))}
        </div>
      </div>
      <Modal open={editMember} onClose={() => handleCancelMember} form>
        <div className={cx("edit-member-wrapper")}>
          <Input
            dark
            placeholder="Name..."
            frame="Name"
            name="name"
            value={tempValueMember?.name || ""}
            onChange={handleMemberChange}
            error={errors.name}
          />
          <div className={cx("file-container")}>
            <input
              type="file"
              name={tempValueMember?.avatar}
              onChange={(e) => handleChangeImg(e, "member")}
            />
          </div>
          <img src={tempValueMember?.avatar || images.noImg} />
        </div>
        {errors.avatar && <p className={cx("error-text")}>{errors.avatar}</p>}
        <div className={cx("btn-container")}>
          <Button large onClick={handleSaveMember}>
            Save
          </Button>
          <Button large onClick={handleCancelMember}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default AboutUsManage;
