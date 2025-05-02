import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const CityContext = createContext({
  allCities: [],
  city: {},
  tempCity: {},
  errors: {},
  openEditForm: {},
  resetForm: () => {},
  citiesSearchResult: {},
  setCitiesSearchResult: () => {},
  handleChangeCityImage: () => {},
  handleChangeCityInput: () => {},
  handleSaveCity: () => {},
  handleCreateCity: () => {},
  handleDeleteCity: () => {},
  handleSearchCity: () => {},
  getCityFromParam: () => {},
});

export const CityProvider = ({ data, children }) => {
  const [allCities, setAllCities] = useState([]);
  const [city, setCity] = useState(
    data || {
      name: "",
      image: "",
    }
  );
  const [tempCity, setTempCity] = useState({});
  const [citiesSearchResult, setCitiesSearchResult] = useState([]);
  const [errors, setErrors] = useState({});
  const [openEditForm, setOpenEditForm] = useState(false);
  const param = useParams();

  useEffect(() => {
    setTempCity(city);
  }, [city]);

  useEffect(() => {
    if (data) return;
    axios
      .get("http://localhost:3000/cities")
      .then((res) => {
        setAllCities(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const validateInput = (name, value) => {
    const newErrors = {};
    switch (name) {
      case "name": {
        if (!value.trim()) {
          newErrors.name = "City cannot be empty!";
        }
        break;
      }
      case "image": {
        if (!value) {
          newErrors.image = "Please select image!";
        }
        break;
      }
    }
    return newErrors;
  };
  const resetForm = () => {
    setErrors({});
    setCity({ name: "", value: "" });
  };

  const handleChangeCityInput = (e) => {
    const { name, value } = e.target;
    const newErrors = validateInput(name, value);
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors, ...newErrors };
      if (!newErrors[name]) {
        delete updatedErrors[name];
      }
      return updatedErrors;
    });
    setTempCity((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeCityImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setTempCity((prev) => ({ ...prev, image: base64 }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveCity = async (id) => {
    let newErrors = {};
    Object.entries(tempCity).forEach(([name, value]) => {
      const updatedErrors = validateInput(name, value);
      newErrors = { ...newErrors, ...updatedErrors };
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      console.log("Validation failed, not saving");
      return false;
    }
    try {
      const res = await axios.put(
        `http://localhost:3000/cities/${id}`,
        tempCity
      );

      if (res.data.success) {
        toast.success(res.data.message || "Updated sucessful!");
        setAllCities((prev) =>
          prev.map((city) => {
            if (city._id === id) {
              return { ...city, ...res.data.data }; // Cập nhật chính xác
            }
            return city; // Không trùng thì giữ nguyên
          })
        );

        setOpenEditForm(false);
      }
    } catch (err) {
      toast.error(err);
    }
  };
  const handleCreateCity = async () => {
    let newErrors = {};
    Object.entries(tempCity).forEach(([name, value]) => {
      const updatedErrors = validateInput(name, value);
      newErrors = { ...newErrors, ...updatedErrors };
    });
    setCity(tempCity);
    try {
      const res = await axios.post(
        "http://localhost:3000/cities/create_city",
        tempCity
      );
      if (res.data.success) {
        toast.success(res.data.manage || "Create successfull!");
        setAllCities((prev) => prev.concat(res.data.data));
        setCity({ name: "", image: "" });
        setOpenEditForm(false);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleDeleteCity = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/cities/${id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        setAllCities((prev) =>
          prev.filter((currentCity) => currentCity._id !== id)
        );
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleSearchCity = async (name) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/cities/search?name=${name}`
      );
      if (res.data.success) {
        setCitiesSearchResult(
          Array.isArray(res.data.data) ? res.data.data : []
        );
      } else {
        setCitiesSearchResult([]);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const getCityFromParam = async (cityName) => {
    try {
      const res = await axios.get(`http://localhost:3000/cities/${cityName}`);
      return res.data;
    } catch (err) {
      toast.error("Không tìm thấy thành phố!");
      return null;
    }
  };

  return (
    <CityContext.Provider
      value={{
        allCities,
        city,
        tempCity,
        errors,
        citiesSearchResult,
        setCity,
        resetForm,
        openEditForm,
        getCityFromParam,
        setOpenEditForm,
        handleChangeCityImage,
        handleChangeCityInput,
        handleSaveCity,
        handleDeleteCity,
        handleSearchCity,
        handleCreateCity,
        setCitiesSearchResult,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};
