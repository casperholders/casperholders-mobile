import { useRef } from 'react';

export default function useForm() {
  const validations = useRef([]);

  return {
    register: (v) => validations.current.push(v),
    unregister: (v) => validations.current.splice(validations.current.indexOf(v)),
    validate: () => {
      return validations.current.map((v) => v()).every((result) => result);
    },
  };
}
