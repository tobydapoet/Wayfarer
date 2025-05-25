import classNames from "classnames/bind";
import styles from "./About.module.scss";
import { useContext, useState } from "react";
import RowFormat from "../../components/BlogFormat/BlogFormat";
import Member from "../../components/Member/Member";
import { AboutUsContext } from "../../contexts/AboutUsContext";
import { StaffContext } from "../../contexts/StaffContext";

const cx = classNames.bind(styles);

function About() {
  const { allContent } = useContext(AboutUsContext);
  const { allStaffsData } = useContext(StaffContext);

  const [size, setSize] = useState({ width: 0, height: 0 });

  const handleImgLoad = (e, index) => {
    setSize((prev) => ({
      ...prev,
      [index]: { width: e.target.naturalWidth, height: e.target.naturalHeight },
    }));
  };

  return (
    <div className={cx("wrapper")}>
      {allContent.map((content) => (
        <div className={cx("container")} key={content._id}>
          {!content.image ||
          content.image.length === 0 ||
          size[content._id]?.height > size[content._id]?.width ? (
            <RowFormat data={content} vertical />
          ) : (
            <RowFormat data={content} />
          )}
          {content.image && content.image.length > 0 && (
            <img
              src={content.image}
              alt="hidden"
              onLoad={(e) => handleImgLoad(e, content._id)}
              style={{ display: "none" }}
            />
          )}
        </div>
      ))}
      <div className={cx("members-wrapper")}>
        <div className={cx("members-ceo")}>CEO</div>
        <div className={cx("members-container")}>
          {allStaffsData
            .filter((members) => members.position === "super admin")
            .map((member, index) => (
              <Member data={member} key={index} />
            ))}
        </div>
        <div className={cx("members-manager")}>Our team</div>
        <div className={cx("members-container")}>
          {allStaffsData
            .filter((members) => members.position === "admin")
            .map((member, index) => (
              <Member data={member} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default About;
