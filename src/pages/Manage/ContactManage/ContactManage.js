import classNames from "classnames/bind";
import styles from "./ContactManage.module.scss";
import SearchBar from "../../../components/SearchBar";
import ContactItem from "../../../components/ContactItem/ContactItem";

const cx = classNames.bind(styles);

const CONTACTS = [
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    name: "Davis Astee",
    email: "davis@gmail.com",
    title: "Travel Blogger",
    content:
      "Sharing personal experiences from exploring hidden gems around the world, with a focus on local culture and food.",
    createdAt: "2025-04-07 09:30",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    name: "Davis Astee",
    email: "davis@gmail.com",
    title: "Adventure Tour Guide",
    content:
      "Leading mountain hikes, jungle treks, and kayaking expeditions for thrill-seekers across Southeast AsiaLeading mountain hikes, jungle treks, and kayaking expeditions for thrill-seekers across Southeast AsiaLeading mountain hikes, jungle treks, and kayaking expeditions for thrill-seekers across Southeast AsiaLeading mountain hikes, jungle treks, and kayaking expeditions for thrill-seekers across Southeast AsiaLeading mountain hikes, jungle treks, and kayaking expeditions for thrill-seekers across Southeast Asia.",
    createdAt: "2025-04-08 14:15",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    name: "Davis Astee",
    email: "davis@gmail.com",
    title: "Travel Photographer",
    content:
      "Capturing stunning landscapes and vibrant city scenes from destinations across Europe and South America.",
    createdAt: "2025-04-09 18:45",
  },
];

function ContactManage() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("search-container")}>
        <SearchBar />
      </div>
      <div className={cx("contact-list")}>
        {CONTACTS.map((contact, index) => (
          <ContactItem key={index} data={contact} />
        ))}
      </div>
    </div>
  );
}

export default ContactManage;
