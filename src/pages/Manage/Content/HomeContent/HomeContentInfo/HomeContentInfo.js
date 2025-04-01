import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
import Input from "../../../../../components/Input";
import Button from "../../../../../components/Button";
import styles from "./HomeContentInfo.module.scss";
import Tablet from "../../../../../components/Tablet";
import Modal from "../../../../../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const INFO = {
  title: "Magical memories, Bespoke experiences",
  describe:
    "Once you have travelled the voyage never ends. Natalie & Charlie will open a world of wonders and create magical memories that will stay with you far beyond your travels. Diverge from the typical tourist destinations in favour of unique, authentic experiences. Experiences designed in the most inspiring surroundings that will be yours, and yours only. Journeys that create memorable moments and Natalie & Charlie’s bespoke itineraries will make this happen. The wonders of the world are within your reach.",
  images: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9bW-uF_gmJVRZoODKb_K7w-EfW-VgL9GIxw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyL9AV1PxTd5uQ4w1RjckwmAknM-AdizrsYA&s",
    "https://wallpapers-all.com/uploads/posts/2016-11/1_vietnam.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS70QgcSGEc89LYeatd0gT0NNiNolHIEFiOoA&s",
    "https://vietnam.travel/sites/default/files/inline-images/Wallpaper_Con%20Dao_Vietnam%20Tourism_0.jpg",
    "https://i.ex-cdn.com/nongnghiep.vn/files/bao_in/2022/12/08/te-rau-4-1622_20221206_592-152934.jpeg",
    "https://wallpaper.forfun.com/fetch/d3/d3935bc5002ba8663d358186b8b0bbe9.jpeg",
    "https://getwallpapers.com/wallpaper/full/4/4/4/722353-beautiful-vietnam-wallpapers-1920x1080-for-tablet.jpg",
    "https://image.vietnam.travel/sites/default/files/styles/large/public/2022-05/shutterstock_1303493764_1.jpg?itok=AhlENvUY",
    "https://vietnam.travel/sites/default/files/inline-images/Wallpaper_Sapa_Vietnam%20Tourism.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS89RvVD-3cbi2OXOEp94wT8dwlEUW4U-zpYA&s",
    "https://i.natgeofe.com/k/d2701667-c426-4a1b-8d75-d01bdc387fdc/vietnam-ha-long-bay_16x9.jpg?w=1200",
  ],
};

function HomeContentInfo() {
  const param = useParams();

  const [formData, setformData] = useState(
    param.info
      ? {
          ...INFO,
          images: INFO.images,
        }
      : {
          title: "",
          describe: "",
          images: [],
        }
  );
  const [tempFormData, setTempFormData] = useState({ ...formData });
  const [openTest, setOpenTest] = useState(false);
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});

  const validateInput = (name, value) => {
    const newErrors = {};
    switch (name) {
      case "title":
        if (!value.trim()) {
          newErrors.title = "Title cannot empty!";
        }
        break;
      case "describe":
        if (!value.trim()) {
          newErrors.describe = "Describe cannot empty!";
        }
        break;
    }
    return newErrors;
  };
  const handleReset = () => {
    setTempFormData((prev) => ({ ...prev, images: [] }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageUploaded = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));

    setTempFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  // const handleonChange = (e) => {
  //   setformData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  const handleonChange = (e) => {
    const { name, value } = e.target;
    const newErrors = validateInput(name, value);
    setErrors((prevErrors) => {
      const updatedErrors = { ...newErrors, ...prevErrors };
      if (!newErrors[name]) {
        delete updatedErrors[name];
      }
      return updatedErrors;
    });
    setTempFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleApply = (e) => {
    const newErrors = {};
    Object.entries(tempFormData).forEach(([name, value]) => {
      const fieldErros = validateInput(name, value);
      Object.assign(newErrors, fieldErros);
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }
    setOpenTest(true);
  };

  const handleOnSave = () => {
    setformData({ ...tempFormData });
  };

  console.log(param.info);

  console.log("Thông tin sau cập nhât: ", formData);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("images-container")}>
        <div className={cx("setting")}>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUploaded}
            ref={fileInputRef}
          />
          <button className={cx("reset")} onClick={handleReset}>
            Reset
          </button>
        </div>

        {tempFormData.images.length > 0 && (
          <div className={cx("images")}>
            {tempFormData.images.map((image, index) => {
              const imageUrl =
                typeof image === "string" ? image : image.preview;
              return (
                <img src={imageUrl} key={index} alt={`Uploaded ${index}`} />
              );
            })}
          </div>
        )}
      </div>
      <div className={cx("content")}>
        <Input
          dark
          frame="Title"
          name="title"
          maxLength={60}
          placeholder="Title..."
          value={tempFormData.title}
          onChange={handleonChange}
          error={errors.title}
        />
        <Input
          dark
          frame="Describe"
          name="describe"
          maxLength={700}
          textarea
          placeholder="Describe..."
          value={tempFormData.describe}
          onChange={handleonChange}
          error={errors.describe}
        />
      </div>
      <div className={cx("apply")}>
        <Button
          rounded
          onClick={() => {
            handleApply();
          }}
        >
          Apply
        </Button>
      </div>

      <Modal
        test
        form
        open={openTest}
        onClose={(e) => {
          e.stopPropagation();
          setOpenTest(false);
        }}
      >
        <div className={cx("test-wrapper")}>
          <Tablet data={tempFormData} />
          <div className={cx("btn")}>
            <Button rounded onClick={() => setOpenTest(false)}>
              Cancel
            </Button>
            <Button rounded onClick={handleOnSave}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default HomeContentInfo;
