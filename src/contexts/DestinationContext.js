import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CityContext } from "./CityContext";

export const DestinationContext = createContext({
  content: {},
  errors: {},
  allDestinations: [],
  editMode: {},
  currentActivity: {},
  searchResult: {},
  editActivityIndex: {},
  setContent: () => {},
  handleSearchDestinations: () => {},
  handleEditActivityMode: () => {},
  handleSelectedDestination: () => {},
  handleEditActivity: () => {},
  handleSaveActivityOnAdd: () => {},
  handleEditMode: () => {},
  HandleCancelEdit: () => {},
  handleChangeImg: () => {},
  handleEditField: () => {},
  handleSaveActivity: () => {},
  handleAddServices: () => {},
  handleUpdateService: () => {},
  handleDeleteDestination: () => {},
  handleCancelActivity: () => {},
});

export const DestinationProvider = ({ children }) => {
  const [allDestinations, setAllDestinations] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [currentActivity, setCurrentActivity] = useState("");
  const [originalActivity, setOriginalActivity] = useState("");
  const [originalContent, setOriginalContent] = useState({});
  const [editActivityIndex, setEditActivityIndex] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const descriptionRef = useRef();

  const { placement, id } = useParams();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const { getCityFromParam, allCities } = useContext(CityContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/destinations`)
      .then((res) => setAllDestinations(res.data))
      .catch((err) => toast.error(err));
  }, [location]);

  const [content, setContent] = useState({
    name: "",
    cityId: "",
    star: 0,
    unit: "",
    price: 0,
    image: "",
    description: "",
    activities: [],
  });

  useEffect(() => {
    const fetchCity = async () => {
      const city = await getCityFromParam(placement);
      if (city) {
        setContent((prev) => ({ ...prev, cityId: city._id }));
      }
    };

    fetchCity();
  }, [placement]);

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
      setContent((prev) => ({ ...prev, image: base64 }));
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
      navigate(`/manage/destinations/${data.cityId.name}/${data._id}`);
    } else {
      navigate(`/destinations/${data.cityId.name}/${data._id}`);
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
    setContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditActivityMode = (index) => {
    if (index === undefined || index === null) {
      setEditMode("add-activity");
      setCurrentActivity("");
    } else {
      setEditMode("edit-activity");
      setEditActivityIndex(index);
      setCurrentActivity(content.activities[index]);
    }
  };

  const handleEditActivity = (e) => {
    setCurrentActivity(e.target.value);
    setOriginalActivity(currentActivity);
  };

  const handleCancelActivity = () => {
    setCurrentActivity(originalActivity);
    setEditActivityIndex(null);
    setEditMode(null);
  };

  const handleSaveActivity = async () => {
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
      ...content,
      activities: updatedActivities,
      cityId: content.cityId._id || content.cityId,
    };

    try {
      const res = await axios.put(
        `http://localhost:3000/destinations/${content._id}`,
        updatedContent
      );

      if (res.data.success) {
        toast.success(res.data.message);

        setContent(updatedContent);
        setAllDestinations((prev) =>
          prev.map((item) => (item._id === content._id ? res.data.data : item))
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi cập nhật hoạt động!");
    }

    setEditMode(null);
    setEditActivityIndex(null);
    setCurrentActivity("");
  };

  const handleSaveActivityOnAdd = () => {
    const trimmedValue = currentActivity.trim();
    let updatedActivities = Array.isArray(content.activities)
      ? [...content.activities]
      : [];

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
      ...content,
      activities: updatedActivities,
    };

    setContent(updatedContent);
    setEditMode(null);
    setEditActivityIndex(null);
    setCurrentActivity("");
  };

  const handleEditMode = (field) => {
    setOriginalContent(content);
    setEditMode(field);
  };

  const HandleCancelEdit = (field) => {
    setEditMode(null);
    setContent(originalContent);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleSearchDestinations = async (keyword) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/destinations/search?keyword=${keyword}&cityName=${placement}`
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
    Object.entries(content).forEach(([name, value]) => {
      const fieldErrors = validateInput(name, value);
      newErrors = { ...newErrors, ...fieldErrors };
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:3000/destinations/create_destination`,
        content
      );
      if (res.data.success) {
        setAllDestinations((prev) => [...prev, res.data.data]);
        toast.success(res.data.message);
        navigate(`/manage/destinations/${placement}`);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleUpdateService = async () => {
    let newErrors = {};
    Object.entries(content).forEach(([name, value]) => {
      const fieldErrors = validateInput(name, value);
      newErrors = { ...newErrors, ...fieldErrors };
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:3000/destinations/${content._id}`,
        {
          cityId: content.cityId._id,
          ...content,
        }
      );
      if (res.data.success) {
        setAllDestinations((prev) =>
          prev.map((destination) =>
            destination._id === res.data.data._id
              ? { ...destination, ...res.data.data }
              : destination
          )
        );
        setContent(res.data.data);
        setEditMode(null);
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleDeleteDestination = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/destinations/${id}`
      );
      if (res.data.success) {
        setAllDestinations((prev) =>
          prev.filter((destination) => destination._id !== id)
        );
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
        errors,
        allDestinations,
        editMode,
        editActivityIndex,
        currentActivity,
        searchResult,
        setContent,
        handleSearchDestinations,
        handleEditActivityMode,
        handleSelectedDestination,
        HandleCancelEdit,
        handleChangeImg,
        handleEditField,
        handleSaveActivity,
        handleSaveActivityOnAdd,
        handleEditMode,
        handleEditActivity,
        handleCancelActivity,
        handleAddServices,
        handleUpdateService,
        handleDeleteDestination,
      }}
    >
      {children}
    </DestinationContext.Provider>
  );
};
