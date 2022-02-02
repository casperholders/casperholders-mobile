import { useRef, useState } from 'react';

/**
 * Form handler
 * @param initialState
 * @returns {{resetValues: (function(): void), setValues: (function(*): void), values: {}, setValue: (function(*, *): void), unregister: (function(*): *[]), register: (function(*): number), validate: (function(): this is *[])}}
 */
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
