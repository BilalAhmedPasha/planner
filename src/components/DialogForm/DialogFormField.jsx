import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormField } from '../Form';
import { FlexBox, Label } from '@ui5/webcomponents-react';
import * as S from './styled';

const DialogFormField = ({
  label,
  labelStyle,
  name,
  as: FormElement,
  direction,
  required,
  showColon,
  ...props
}) => {
  const colon = useMemo(() => {
    return showColon === false ? false : true;
  }, [showColon]);

  return (
    <S.DialogFormFieldFlexBox direction={direction}>
      {label &&
        (labelStyle ? (
          <S.Label required={required} direction={direction} showColon={colon} style={labelStyle}>
            {label}
          </S.Label>
        ) : (
          <S.Label required={required} direction={direction} showColon={colon}>
            {label}
          </S.Label>
        ))}
      {FormElement && (
        <FlexBox alignItems="center">
          <FormField {...props} name={name} as={FormElement} required={required} />
        </FlexBox>
      )}
    </S.DialogFormFieldFlexBox>
  );
};

export default DialogFormField;

DialogFormField.propTypes = {
  label: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string]),
  name: PropTypes.string.isRequired,
  direction: PropTypes.string,
};

DialogFormField.defaultProps = {
  label: null,
  direction: 'Row',
};
