import classNames from "classnames/bind";
import styles from "./ContactManage.module.scss";
import SearchBar from "../../../components/SearchBar";
import ContactItem from "../../../components/ContactItem/ContactItem";
import { useContext } from "react";
import { ContactContext } from "../../../contexts/ContactContext";
import ContactPopper from "../../../components/ContactPopper/ContactPopper";

const cx = classNames.bind(styles);

function ContactManage() {
  const {
    allContacts,
    searchContacts,
    handleSelectedContact,
    handleDeleteContact,
    handleSearchContact,
  } = useContext(ContactContext);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("search-container")}>
        <SearchBar
          results={searchContacts}
          onSearch={handleSearchContact}
          renderResult={(contact) => (
            <ContactPopper
              data={contact}
              onClick={() => handleSelectedContact(contact)}
            />
          )}
        />
      </div>
      <div className={cx("contact-list")}>
        {allContacts.map((contact) => (
          <ContactItem
            key={contact._id}
            data={contact}
            onClick={() => handleSelectedContact(contact)}
            onDelete={() => handleDeleteContact(contact._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default ContactManage;
