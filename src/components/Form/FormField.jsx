import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller, get, useForm } from 'react-hook-form';

const FormField = ({ name, as: Formcomponent, ...props }) => {
  const { errors } = useFormContext();
  const { message: errorMessage } = get(errors, name) || {};

  const componentProps =
    typeof as === 'string'
      ? {}
      : {
          valueState: errorMessage ? 'Error' : 'None',
          valueStateMessage: <span>{errorMessage}</span>,
        };

  const { getValues } = useForm();

  return (
    <Controller
      name={name}
      defaultValue={props.defaultValue !== undefined ? props.defaultValue : getValues(name)}
      render={({ value, onChange }) => {
        return (
          <Formcomponent
            {...props}
            {...componentProps}
            value={value}
            onChange={onChange}
            name={name}
          />
        );
      }}
    />
  );
};

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
};

FormField.defaultProps = {
  as: null,
};

export default FormField;
