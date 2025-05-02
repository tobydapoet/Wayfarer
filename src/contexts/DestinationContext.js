import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CityContext } from "./CityContext";

export const DestinationContext = createContext({
  content: {},
  tempContent: {},
  errors: {},
  allDestinations: [],
  editMode: {},
  currentActivity: {},
  searchResult: {},
  editActivityIndex: {},
  handleSearchTrips: () => {},
  handleSearchHotels: () => {},
  handleSearchTransports: () => {},
  handleEditActivityMode: () => {},
  handleSelectedDestination: () => {},
  handleEditActivity: () => {},
  handleEditMode: () => {},
  HandleCancelEdit: () => {},
  setTempContent: () => {},
  handleChangeImg: () => {},
  handleEditField: () => {},
  handleSaveActivity: () => {},
  handleSaveDestination: () => {},
  handleAddServices: () => {},
});

export const DestinationProvider = ({ children }) => {
  const [allDestinations, setAllDestinations] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [tempContent, setTempContent] = useState({});
  const [currentActivity, setCurrentActivity] = useState("");
  const [editActivityIndex, setEditActivityIndex] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const { placement, type, id } = useParams();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const { getCityFromParam } = useContext(CityContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/destinations`)
      .then((res) => setAllDestinations(res.data))
      .catch((err) => toast.error(err));
  }, []);

  const [content, setContent] = useState({
    name: "",
    cityId: "",
    star: 0,
    unit: "",
    price: 0,
    image: "",
    description: "",
    activities: [],
    type: "trips",
  });

  useEffect(() => {
    const fetchCity = async () => {
      const city = await getCityFromParam(placement);
      if (city) {
        console.log("City found:", city);
        setContent((prev) => ({ ...prev, cityId: city._id }));
      } else {
        console.log("City not found");
      }
    };

    fetchCity();
  }, [placement]);

  useEffect(() => {
    setTempContent({ ...content });
  }, [content]);

  useEffect(() => {
    if (id && id !== "add_content") {
      axios
        .get(`http://localhost:3000/destinations/${id}`)
        .then((res) => {
          setContent(res.data);
        })
        .catch((err) => {
          console.error("Lỗi khi gọi API:", err);
        });
    }
  }, [id]);

  useEffect(() => {
    setSearchResult([]);
  }, [type]);

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
        if (!value) {
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
      case "image": {
        if (!value) {
          newErrors.image = "Please choose image!";
        }
        break;
      }
      case "unit": {
        if (!value.trim()) {
          newErrors.unit = "Please choose unit!";
        }
        break;
      }
    }
    return newErrors;
  };
  const handleChangeImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setTempContent((prev) => ({ ...prev, image: base64 }));
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.image;
        return newErrors;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSelectedDestination = (data) => {
    if (location.includes("manage")) {
      navigate(`/manage/destinations/${placement}/${type}/${data._id}`);
    } else {
      navigate(`/destinations/${placement}/${type}/${data._id}`);
    }

    setContent(data);
  };

  const handleEditField = (e) => {
    const { name, value } = e.target;
    const newErrors = validateInput(name, value);
    setErrors((prevErrors) => {
      const updatedErrors = { ...newErrors, ...prevErrors };
      if (!newErrors[name]) {
        delete updatedErrors[name];
      }
      return updatedErrors;
    });
    setTempContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditActivityMode = (index) => {
    if (index === undefined || index === null) {
      setEditMode("add-activity");
      setCurrentActivity("");
      // setEditActivityIndex();
    } else {
      setEditMode("edit-activity");
      setEditActivityIndex(index);
      setCurrentActivity(tempContent.activities[index]);
    }
  };

  const handleEditActivity = (e) => {
    setCurrentActivity(e.target.value);
  };
  const handleSaveActivity = () => {
    const trimmedValue = currentActivity.trim();
    let updatedActivities = [...content.activities];

    if (trimmedValue === "") {
      if (editActivityIndex !== null) {
        updatedActivities.splice(editActivityIndex, 1);
      }
    } else {
      if (editActivityIndex !== null) {
        updatedActivities[editActivityIndex] = trimmedValue;
      } else {
        updatedActivities.push(trimmedValue);
      }
    }

    const updatedContent = {
      ...tempContent,
      activities: updatedActivities,
    };

    setContent(updatedContent);
    setTempContent(updatedContent); // << Cập nhật để không bị mất
    setEditMode(null);
    setEditActivityIndex(null);
    setCurrentActivity("");
  };
  const handleSaveDestination = () => {
    let newErrors = {};
    Object.entries(tempContent).forEach(([name, value]) => {
      const fieldErrors = validateInput(name, value);
      newErrors = { ...newErrors, ...fieldErrors };
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    setEditMode(null);
    setContent((prev) => ({
      ...prev,
      ...tempContent,
    }));
  };

  const handleEditMode = (field) => {
    setEditMode(field);
  };

  const HandleCancelEdit = (field) => {
    setEditMode(null);
    setTempContent({ ...content });
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleSearchTrips = async (keyword) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/destinations/search_trips?keyword=${keyword}&cityName=${placement}`
      );
      if (res.data.success) {
        setSearchResult(Array.isArray(res.data.data) ? res.data.data : []);
      } else {
        setSearchResult([]);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleSearchHotels = async (keyword) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/destinations/search_hotels?keyword=${keyword}&cityName=${placement}`
      );
      if (res.data.success) {
        setSearchResult(Array.isArray(res.data.data) ? res.data.data : []);
      } else {
        setSearchResult([]);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleSearchTransports = async (keyword) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/destinations/search_transports?keyword=${keyword}&cityName=${placement}`
      );
      if (res.data.success) {
        setSearchResult(Array.isArray(res.data.data) ? res.data.data : []);
      } else {
        setSearchResult([]);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleAddServices = async () => {
    let newErrors = {};
    Object.entries(tempContent).forEach(([name, value]) => {
      const fieldErrors = validateInput(name, value);
      newErrors = { ...newErrors, ...fieldErrors };
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    setEditMode(null);
    try {
      const res = await axios.post(
        `http://localhost:3000/destinations/create_destination`,
        tempContent
      );
      if (res.data.success) {
        navigate(-1);
        setAllDestinations((prev) => [...prev, res.data.data]);
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <DestinationContext.Provider
      value={{
        content,
        tempContent,
        errors,
        allDestinations,
        editMode,
        editActivityIndex,
        currentActivity,
        searchResult,
        handleSearchTrips,
        handleSearchHotels,
        handleSearchTransports,
        handleEditActivityMode,
        handleSelectedDestination,
        HandleCancelEdit,
        setTempContent,
        handleChangeImg,
        handleEditField,
        handleSaveActivity,
        handleSaveDestination,
        handleEditMode,
        handleEditActivity,
        handleAddServices,
      }}
    >
      {children}
    </DestinationContext.Provider>
  );
};
