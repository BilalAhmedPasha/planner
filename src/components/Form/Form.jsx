import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export const handleFormResetFunction = ({ resetValues, defaultValues, reset, onReset }) => {
  const newValues = resetValues || defaultValues;
  reset(newValues);
  onReset(newValues);
};

export const handleSubmissionErrorsFunction = ({ error, getFormFieldNames, fields, setError }) => {
  const { response } = error;
  if (!response) {
    return;
  }
  const { message, errors } = response.data || {};
  if (message) {
    return;
  }
  // eslint-disable-next-line no-console
  if (errors) {
    const fieldNames = getFormFieldNames({ formFields: fields });
    Object.keys(errors).forEach(field => {
      if (fieldNames.includes(field)) {
        setError(field, {
          type: 'server validation error',
          message: errors[field][0],
        });
      }
    });
  }
};

export const handleSubmissionFunction = ({ formValues, onSubmit, methods, onSuccess }) => {
  return Promise.resolve(onSubmit(formValues, methods)).then(data => {
    console.log(data);
    return typeof onSuccess === 'function' && onSuccess(data, methods);
  });
};

const Form = forwardRef(
  (
    {
      formType,
      errorList,
      defaultValues,
      validationSchema,
      onSubmit,
      onReset,
      onSuccess,
      resetValues,
      confirmButtonTitle,
      title,
      formContentComponent: FormContentComponent,
      fields,
      shouldUnregister,
      ...props
    },
    ref,
  ) => {
    const formRef = useRef(null);

    const methods = useForm({
      mode: 'onChange',
      reValidateMode: 'onChange',
      defaultValues,
      resolver: validationSchema ? yupResolver(validationSchema) : null,
      shouldUnregister,
    });

    const { handleSubmit, reset, watch, formState, setError } = methods;

    const handleFormReset = useCallback(() => {
      handleFormResetFunction({
        resetValues: resetValues,
        defaultValues: defaultValues,
        reset: reset,
        onReset: onReset,
      });
    }, [defaultValues, onReset, reset, resetValues]);

    const handleSubmission = useCallback(
      formValues => {
        handleSubmissionFunction({
          formValues: formValues,
          onSubmit: onSubmit,
          methods: methods,
          onSuccess: onSuccess,
        });
      },
      [methods, onSubmit, onSuccess],
    );

    const getFormFieldNames = ({ formFields }) =>
      formFields &&
      formFields
        .map(({ isGroup, groupFieldNames, name }) => (isGroup ? groupFieldNames : name))
        .flat();

    const handleSubmissionErrors = useCallback(
      error => {
        handleSubmissionErrorsFunction({
          error: error,
          getFormFieldNames: getFormFieldNames,
          fields: fields,
          setError: setError,
        });
      },
      [fields, setError, reset],
    );

    const handleFormSubmit = useCallback(
      () => handleSubmit(handleSubmission)().catch(handleSubmissionErrors),
      [handleSubmission, handleSubmissionErrors, handleSubmit],
    );

    useEffect(() => {
      if (formRef.current) {
        formRef.current.submit = handleFormSubmit;
      }
    }, [handleFormSubmit]);

    return (
      <FormProvider {...methods}>
        <form ref={formRef}>
          <FormContentComponent
            {...props}
            formType={formType}
            errorList={errorList}
            formState={formState}
            watch={watch}
            reset={reset}
            onSubmit={handleFormSubmit}
            onFormReset={handleFormReset}
            confirmButtonTitle={confirmButtonTitle}
            title={title}
            defaultValues={defaultValues}
            fields={fields}
            ref={ref}
          />
        </form>
      </FormProvider>
    );
  },
);

Form.propTypes = {
  formType: PropTypes.string.isRequired,
  defaultValues: PropTypes.shape({}).isRequired,
  validationSchema: PropTypes.shape({}),
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  onSuccess: PropTypes.func,
  onCloseErrorDialog: PropTypes.func,
  formContentComponent: PropTypes.elementType.isRequired,
  resetValues: PropTypes.shape({}),
  fields: PropTypes.arrayOf(PropTypes.object),
  shouldUnregister: PropTypes.bool,
};

Form.defaultProps = {
  formType: null,
  resetValues: null,
  onSubmit: null,
  onReset: null,
  onSuccess: null,
  onCloseErrorDialog: null,
  validationSchema: null,
  fields: null,
  shouldUnregister: true,
};

export default Form;
