import { useState } from 'react';

function useForm<T>(initialState: T) {
  const [formData, setFormData] = useState<T>(initialState);

  const handleChange = <K extends keyof T>(field: K, value: T[K]) => {
    setFormData({ ...formData, [field]: value });
  };

  return { formData, handleChange };
}

export default useForm;

