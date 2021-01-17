import { useState, useEffect } from 'react';
// import { setPropsInNull } from '../utils/formUtils';

export const useForm = (initialState, submit) => {
  const [ values, setValues ] = useState(initialState);
  const [ errors, setErrors ] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnChange = ({ target }, validators = []) => {
    setValues({
      ...values,
      [target.name]: target.value
    });
    setErrors({
      ...errors,
      [target.name]: joinValidators(target.value, validators)
    });
  }

  const joinValidators = (value, validators) => {
    const valid = validators.map(validator => {
      return validator(value);
    });
    return valid.some(v => v === true);
  }

  const validForm = (errors) => {
    const valid = Object.values(errors);
    return !valid.some(v => v === true || v === null);
  }

  const handleOnSubmit = e => {
    e.preventDefault();
    if (isSubmitting) {
      submit();
      setValues(initialState);
      setErrors(initialState);
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    setIsSubmitting(validForm(errors));
  }, [errors, isSubmitting, values]);

  return {
    values,
    handleOnChange,
    handleOnSubmit,
    errors,
    isSubmitting,
    setValues
  };
}
