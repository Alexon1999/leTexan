import { useState } from "react";

const useForm = (initialState, validator = null) => {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const changingInput = { [e.target.name]: e.target.value };

    setState({
      ...state,
      ...changingInput,
    });

    if (validator) validator(changingInput);
  };

  const reinitialiserState = () => setState(initialState);

  return {
    state,
    setState,
    errors,
    setErrors,
    handleInputChange,
    reinitialiserState,
  };
};

export default useForm;
