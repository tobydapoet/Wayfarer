import { useState } from "react"

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (e) => {
        if(e.target && e.target.name){
        const { name, value } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value
        }));
    }};
    const resetData =() => {
        setValues(initialValues)
    }

    return [values, handleChange, resetData];
};


export default useForm