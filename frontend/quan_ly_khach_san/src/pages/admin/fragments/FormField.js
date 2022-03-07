import { FormControl, FormLabel, Input, Textarea, FormErrorMessage } from "@chakra-ui/react";
import React from "react";

function InputField(props) {
  const { field, form, type, label, placeholder, disabled } = props;

  const { name, value, onChange, onBlur } = field;

  const {errors, touched} = form
  const showError = errors[name] && touched[name];

  return (
    <FormControl mt={2} isInvalid={showError}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Input
        size="sm"
        bg="white"
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
      />
      {showError && <p style={{color: 'red', fontSize:'12px'}}>{errors[name]}</p>}
    </FormControl>
  );
}

function TextareaField(props) {
  const { field, form, type, label, placeholder, disabled } = props;
  const { name, value, onChange, onBlur } = field;

  return (
    <FormControl mt={2}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Textarea 
        size="sm"
        bg="white"
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
      />
    </FormControl>
  );
}

export default {InputField, TextareaField};
