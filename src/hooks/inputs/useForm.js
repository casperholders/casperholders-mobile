import { useRef, useState } from 'react';

export default function useForm(initialState = {}) {
  const [values, setValues] = useState(initialState);
  const validations = useRef([]);

  return {
    values,
    setValue: (key, newValue) => setValues({ ...values, [key]: newValue }),
    setValues: (newValues) => setValues({ ...values, ...newValues }),
    resetValues: () => setValues(initialState),
    register: (v) => validations.current.push(v),
    unregister: (v) => validations.current.splice(validations.current.indexOf(v)),
    validate: () => {
      return validations.current.map((v) => v()).every((result) => result);
    },
  };
}
