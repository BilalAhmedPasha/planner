import React, { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, Title, Loader, FlexBox } from '@ui5/webcomponents-react';
import * as S from './styled';
import * as FormType from '../../constants/formType.constants';
import useTranslate from '../../hooks/useTranslate';
import ErrorMesssages from '../ErrorMessages';
import DiscardMessage from '../DiscardMessage/DiscardMessage';
import { useSelector } from 'react-redux';
import { defaultProfileListSelector } from '../../features/ConstraintProfileTab/state/constraintProfile/constraintProfile.reducer';

const DialogForm = forwardRef(
  (
    {
      title,
      errorList,
      subtitle,
      confirmButtonTitle,
      closeButtonTitle,
      onSubmit,
      onClose,
      onEditClick,
      formState,
      children,
      formType,
      width,
      height,
      profileKey,
      ...props
    },
    ref,
  ) => {
    const t = useTranslate();

    const DEFAULT_PROFILES = useSelector(defaultProfileListSelector);
    const currentDefault = useMemo(() => {
      if (DEFAULT_PROFILES && profileKey) return DEFAULT_PROFILES[profileKey];
      return null;
    }, [DEFAULT_PROFILES, profileKey]);

    const isDefaultProfile = props.defaultValues
      ? currentDefault?.profileName === props.defaultValues.profileName
      : false;

    const renderConfirmButton = useMemo(() => {
      if (isDefaultProfile) {
        return null;
      } else {
        return (
          <Button
            design="Emphasized"
            onClick={onEditClick}
            disabled={formState.isSubmitting}
            data-testid="confirmButton"
            id="confirmButton"
          >
            {confirmButtonTitle}
          </Button>
        );
      }
    }, [onEditClick, formState, confirmButtonTitle, isDefaultProfile]);

    return (
      <>
        <S.Dialog
          className="sapUiSizeCompact"
          width={width}
          height={height}
          ref={ref}
          accessibleName={title}
          preventFocusRestore={true}
          initialFocus="confirmButton"
          draggable={true}
          header={
            <S.DialogHeaderFlexBox
              fitContainer
              direction="Column"
              alignItems="Start"
              justifyContent="Center"
            >
              <Title id="title" level="H5">
                {title}
              </Title>
              {typeof subtitle === 'string' ? <Title level="H6">{subtitle}</Title> : subtitle}
              {formState.isSubmitting && <Loader />}
            </S.DialogHeaderFlexBox>
          }
          footer={
            <>
              <S.DialogFooterFlexBox fitContainer alignItems="Center" justifyContent="SpaceBetween">
                <FlexBox>
                  {errorList !== undefined && errorList.length > 0 ? (
                    <ErrorMesssages errorList={errorList} />
                  ) : null}
                </FlexBox>
                <FlexBox>
                  {formType === FormType.CREATE || formType === FormType.EDIT ? (
                    <Button
                      design="Emphasized"
                      onClick={onSubmit}
                      disabled={formState.isSubmitting}
                      data-testid="confirmButton"
                      id="confirmButton"
                    >
                      {confirmButtonTitle}
                    </Button>
                  ) : (
                    renderConfirmButton
                  )}
                  {formType === FormType.VIEW ? (
                    <Button
                      data-testid="closeButton"
                      disabled={formState.isSubmitting}
                      onClick={() => onClose('cancel')}
                      style={{ marginLeft: '0.5rem' }}
                    >
                      {closeButtonTitle}
                    </Button>
                  ) : (
                    <DiscardMessage
                      buttonClickHandler={() => onClose('cancel')}
                      popOverButtonmessage={t('DISCARD_ALL_CHANGES')}
                      popOverButton={t('DISCARD')}
                      buttonText={closeButtonTitle}
                    />
                  )}
                </FlexBox>
              </S.DialogFooterFlexBox>
            </>
          }
        >
          {typeof children === 'function' ? children(props) : children}
        </S.Dialog>
      </>
    );
  },
);

DialogForm.displayName = 'DialogForm';

DialogForm.propTypes = {
  formType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.node,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  confirmButtonTitle: PropTypes.string.isRequired,
  closeButtonTitle: PropTypes.string,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  formState: PropTypes.shape({
    isSubmitting: PropTypes.bool,
  }).isRequired,
};

DialogForm.defaultProps = {
  subtitle: null,
};

export default DialogForm;
