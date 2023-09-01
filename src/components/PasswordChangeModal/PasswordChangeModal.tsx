import { useCallback } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Modal, Box, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import './styles.scss';
import { PASSWORD_REGEXP } from '../../consts';
import { FormInputPassword } from '../form-components/FormInputPassword';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Customer } from '@commercetools/platform-sdk';
import { changePassword } from '../../slices/customer/slice';
import { PasswordChangeRequest } from '../../slices/customer/types';

import { setAlert } from '../../slices/alerts/slice';
import { ServerError } from '../../api/types';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  customer: Customer;
};

export const PasswordChangeModal: React.FC<Props> = ({ open, setOpen, customer }: Props): React.ReactElement => {
  const dispatch = useAppDispatch();
  const handleClose = useCallback((): void => setOpen(false), [setOpen]);
  const { control, handleSubmit, reset, getValues } = useForm();
  const progressUpdating = useAppSelector((state) => state.customer.progress.update);
  const discardChanges = useCallback((): void => {
    handleClose();
    reset();
  }, [handleClose, reset]);
  const { id, version } = customer;
  const onSubmit = useCallback(
    (data: FieldValues): void => {
      const onSuccess = (): void => {
        dispatch(setAlert({ message: 'Password was successfully updated', severity: 'success' }));
        handleClose();
      };
      const onError = (error: ServerError): void => {
        dispatch(setAlert({ message: error.message, severity: 'error' }));
      };
      const request: PasswordChangeRequest = {
        id,
        version,
        currentPassword: data.password,
        newPassword: data.newPassword,
        onSuccess,
        onError,
      };
      dispatch(changePassword(request));
    },
    [id, version, dispatch, handleClose],
  );

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-container">
        <Typography className="modal-title" variant="h5">
          Change password
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="change-password_form">
          <div className="passwords-container">
            <FormInputPassword
              name={'password'}
              control={control}
              label={'Current password'}
              type="password"
              rules={{
                required: 'Current password is required',
              }}
            />
            <FormInputPassword
              name={'newPassword'}
              control={control}
              label={'New password'}
              type="password"
              rules={{
                required: 'Password is required',
                pattern: {
                  value: PASSWORD_REGEXP,
                  message:
                    'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
                },
              }}
            />
            <FormInputPassword
              name={'newPasswordConfirmation'}
              control={control}
              label={'Confirm new password'}
              type="password"
              rules={{
                required: 'Password is required',
                pattern: {
                  value: PASSWORD_REGEXP,
                  message:
                    'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
                },
                validate: (value): string | boolean => {
                  const newPassword = getValues('newPassword');
                  return value === newPassword ? true : `Passwords do not match`;
                },
              }}
            />
          </div>
          <div className="change-password_controls">
            <Button variant="contained" color="secondary" onClick={discardChanges}>
              Cancel
            </Button>
            <LoadingButton loading={progressUpdating} type="submit" variant="contained" data-testid="submit-btn">
              Save
            </LoadingButton>
          </div>
        </form>
      </Box>
    </Modal>
  );
};
