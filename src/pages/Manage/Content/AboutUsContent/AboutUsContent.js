import classNames from "classnames/bind";
import styles from "./AboutUsContent.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AboutContentItem from "../../../../components/AboutContentItem/AboutContentItem";
import Member from "../../../../components/Member/Member";
import Modal from "../../../../components/Modal";
import { useState } from "react";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import images from "../../../../assets/images";

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

function AboutUsContent() {
  const [editMember, setEditMember] = useState(false);
  const [members, setmembers] = useState(MEMBERS);
  const [selectedMember, setSelectedMember] = useState(null);
  const [tempValueMember, setTempValueMember] = useState(null);

  const [editContent, setEditContent] = useState(false);
  const [contents, setContent] = useState(CONTENTS);
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedTempContent, setSelectedTempContent] = useState(null);

  const handleEditContent = (content) => {
    {
      setSelectedContent(content ? { ...content } : null);
      setSelectedTempContent(content ? { ...content } : null);
      setEditContent(true);
    }
  };
  const handleEditMember = (member) => {
    {
      setSelectedMember(member ? { ...member } : null);
      setTempValueMember(member ? { ...member } : null);
      setEditMember(true);
    }
  };
  const handleCancelMember = () => {
    setSelectedMember(selectedMember);
    setEditMember(false);
  };

  const handleSaveMember = () => {
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

  const handleCancelContent = () => {
    setSelectedContent(selectedMember);
    setEditContent(false);
  };

  const handleSaveContent = () => {
    if (selectedContent) {
      setContent((prevContents) =>
        prevContents.map((content) =>
          content.id === selectedContent.id
            ? selectedTempContent
            : content
        )
      );
    } else {
      setContent((prevContents) => [...prevContents, selectedTempContent]);
    }
    setEditContent(false);
  };

  const handleContentChange = (e) => {
    setSelectedTempContent((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleMemberChange = (e) => {
    setTempValueMember((prev) => ({ ...prev, name: e.target.value }));
  };

  console.log(selectedTempContent, selectedContent);
  console.log(contents);

  const handleChangeImg = (e, type) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      console.warn("File không phải là ảnh!");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const imgURL = reader.result;
      if (type === "member") {
        setTempValueMember((prev) => ({ ...prev, avatar: imgURL }));
      } else if (type === "content") {
        setSelectedTempContent((prev) => ({ ...prev, image: imgURL }));
      }
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
            <div className={cx("add")} onClick={() => handleEditContent(null)}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
          <div className={cx("content")} />
          {contents.map((content, index) => (
            <AboutContentItem
              data={content}
              key={index}
              onClick={() => handleEditContent(content)}
            />
          ))}
        </div>
      </div>
      <Modal open={editMember} onClose={() => setEditMember(false)}>
        <div className={cx("edit-member-wrapper")}>
          <Input
            light
            placeholder="Name..."
            frame="Name"
            name="name"
            value={tempValueMember?.name || ""}
            onChange={handleMemberChange}
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
        <div className={cx("btn-container")}>
          <Button large onClick={handleSaveMember}>
            Save
          </Button>
          <Button large onClick={handleCancelMember}>
            Cancel
          </Button>
        </div>
      </Modal>

      <Modal open={editContent} onClose={() => setEditContent(false)} bigedit>
        <div className={cx("content-edit-wrapper")}>
          <div className={cx("content-edit-text")}>
            <Input
              light
              placeholder="Title"
              frame="Title"
              name="title"
              value={selectedTempContent?.title || ""}
              onChange={handleContentChange}
            />
            <Input
              light
              textarea
              placeholder="Describe..."
              frame="Describe"
              name="describe"
              value={selectedTempContent?.describe || ""}
              onChange={handleContentChange}
            />
          </div>
          <div className={cx("file-wrapper")}>
            <div className={cx("file-container")}>
              <input
                type="file"
                name={selectedTempContent?.image}
                onChange={(e) => handleChangeImg(e, "content")}
              />
            </div>
            <img src={selectedTempContent?.image || images.noImg} />
          </div>
        </div>
        <div className={cx("btn-container")}>
          <Button large onClick={handleSaveContent}>
            Save
          </Button>
          <Button large onClick={handleCancelContent}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default AboutUsContent;
