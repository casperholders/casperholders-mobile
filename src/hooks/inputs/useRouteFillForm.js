import { useEffect, useMemo } from 'react';

export default function useRouteFillForm(route, form, keys) {
  const deps = useMemo(() => keys.map((k) => route.params?.[k]), [route, keys]);

  useEffect(() => {
    const newValues = {};
    keys.forEach((k) => {
      const newValue = route.params?.[k];
      if (newValue) {
        newValues[k] = newValue;
      }
    });

    form.setValues(newValues);
  }, deps);
}
