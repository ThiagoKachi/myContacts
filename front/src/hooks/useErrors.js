import { useCallback, useState } from 'react';

export function useErrors() {
  const [errors, setErrors] = useState([]);

  const setError = useCallback(({ field, message }) => {
    const errorAlreadyExists = errors.find((error) => error.field === field);

    if (errorAlreadyExists) {
      return;
    }

    setErrors((prevState) => [
      ...prevState,
      { field, message },
    ]);
  }, [errors]);

  const removeError = useCallback((fieldName) => {
    setErrors((prevState) => prevState.filter((error) => error.field !== fieldName));
  }, []);

  const getErrorMessageByField = useCallback((fieldName) => {
    const error = errors.find((errorItem) => errorItem.field === fieldName);

    return error ? error.message : '';
  }, [errors]);

  return {
    setError,
    removeError,
    getErrorMessageByField,
    errors,
  };
}
