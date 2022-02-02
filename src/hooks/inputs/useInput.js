import { useEffect, useRef, useState } from 'react';

/**
 * Input form handler
 * @param form
 * @param currentValue
 * @param rules
 * @param onChange
 * @returns {[React.MutableRefObject<*>,setValue,unknown]}
 */
export default function useInput(form, currentValue, rules, onChange) {
  const value = useRef(currentValue);
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

    return !hasError;
  };

  useEffect(() => {
    form.register(validate);

    return () => {
      form.unregister(validate);
    };
  }, []);

  const setValue = (newValue) => {
    if (value.current === newValue) {
      return;
    }

    value.current = newValue;
    validate();
    onChange(value.current);
  };

  useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  return [value, setValue, error];
}
