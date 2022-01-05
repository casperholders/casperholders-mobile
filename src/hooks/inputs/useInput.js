import { useEffect, useRef, useState } from 'react';

export default function useInput(form, defaultValue, rules, onChange) {
  const value = useRef(defaultValue);
  const [valid, setValid] = useState(true);
  const [error, setError] = useState(undefined);

  const validate = () => {
    setError(undefined);

    const hasError = rules.some((rule) => {
      const result = rule(value.current);
      if (result !== true) {
        setError(result);

        return true;
      }

      return false;
    });

    setValid(!hasError);

    return !hasError;
  };

  useEffect(() => {
    form.register(validate);

    return () => {
      form.unregister(validate);
    };
  }, []);

  const setValue = (newValue) => {
    value.current = newValue;
    validate();
    onChange(value.current);
  };

  return [value, setValue, valid, error];
}
