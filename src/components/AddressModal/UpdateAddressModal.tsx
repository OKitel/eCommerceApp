import { useCallback, useState, useEffect, useMemo } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Modal, Box, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Address, Customer } from '@commercetools/platform-sdk';
import { changeAddress } from '../../slices/customer/slice';
import { ChangeAddressRequest } from '../../slices/customer/types';

import { setAlert } from '../../slices/alerts/slice';
import { ServerError } from '../../api/types';
import { AddressFields } from '../AddressFields/AddressFields';
import './styles.scss';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  customer: Customer;
  address: Address;
};

export const UpdateAddressModal: React.FC<Props> = ({
  open,
  setOpen,
  customer,
  address,
}: Props): React.ReactElement => {
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const dispatch = useAppDispatch();
  const progressUpdating = useAppSelector((state) => state.customer.progress.update);
  const { id, version } = customer;

  const { control, handleSubmit, reset, getValues } = useForm<FieldValues>({
    defaultValues: useMemo(
      () => ({
        firstName: address.firstName,
        lastName: address.lastName,
        street: address.streetName,
        city: address.city,
        country: address.country,
        postcode: address.postalCode,
      }),
      [address],
    ),
  });

  const handleClose = useCallback((): void => setOpen(false), [setOpen]);

  const discardChanges = useCallback((): void => {
    handleClose();
    reset();
  }, [handleClose, reset]);

  const onSubmit = useCallback(
    (data: FieldValues): void => {
      const onSuccess = (): void => {
        dispatch(setAlert({ message: 'Your address was successfully updated', severity: 'success' }));
        handleClose();
        setIsSubmitSuccessful(true);
      };
      const onError = (error: ServerError): void => {
        dispatch(setAlert({ message: error.message, severity: 'error' }));
      };
      if (!address.id) return;
      const request: ChangeAddressRequest = {
        id,
        version,
        addressId: address.id,
        address: {
          firstName: data.firstName,
          lastName: data.lastName,
          streetName: data.street,
          city: data.city,
          country: data.country,
          postalCode: data.postcode,
        },
        onSuccess,
        onError,
      };
      dispatch(changeAddress(request));
    },
    [id, version, dispatch, handleClose, address.id],
  );

  useEffect(() => {
    reset({
      firstName: address.firstName,
      lastName: address.lastName,
      street: address.streetName,
      city: address.city,
      country: address.country,
      postcode: address.postalCode,
    });
    setIsSubmitSuccessful(false);
  }, [isSubmitSuccessful, reset, address]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-container">
        <Typography className="modal-title" variant="h5">
          Update address
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="add-address-form">
          <AddressFields withName control={control} getValues={getValues} />
          <div className="address_controls">
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
