import { useState } from 'react';
import { Accordion, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { Customer, Address } from '@commercetools/platform-sdk';

import { messages } from '../../messages';
import { deleteAddress, setDefaultAddress } from '../../slices/customer/slice';
import { DeleteAddressRequest, SetDefaultAddressRequest } from '../../slices/customer/types';
import { setAlert } from '../../slices/alerts/slice';
import { ServerError } from '../../api/types';
import { useAppDispatch } from '../../store/hooks';

import { AccordionItem } from './AccordionItem';
import { UpdateAddressModal } from '../AddressModal/UpdateAddressModal';
import { ConfirmationModal } from '../ConfirmationModal/ConfirmationModal';

import './styles.scss';

type Props = {
  customer: Customer;
};
export const AddressesAccordion: React.FC<Props> = ({ customer }: Props): React.ReactElement => {
  const [expanded, setExpanded] = useState(true);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<{ id: string; type: 'shipping' | 'billing' } | undefined>();
  const [addressToEdit, setAddressToEdit] = useState<Address | undefined>();
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const dispatch = useAppDispatch();
  const { addresses, billingAddressIds, shippingAddressIds, defaultBillingAddressId, defaultShippingAddressId } =
    customer;

  const shippingAddresses: Address[] = [];
  const billingAddresses: Address[] = [];
  addresses.forEach((address: Address) => {
    if (shippingAddressIds && shippingAddressIds.includes(address.id ?? '')) {
      shippingAddresses.push(address);
    }
    if (billingAddressIds && billingAddressIds.includes(address.id ?? '')) {
      billingAddresses.push(address);
    }
  });

  const deleteAddressConfirmed = (): void => {
    if (addressToDelete) {
      const onSuccess = (): void => {
        dispatch(setAlert({ message: 'Your address was successfully deleted', severity: 'success' }));
        setOpenConfirmationModal(false);
      };
      const onError = (error: ServerError): void => {
        dispatch(setAlert({ message: error.message, severity: 'error' }));
      };
      const request: DeleteAddressRequest = {
        id: customer.id,
        addressId: addressToDelete.id,
        version: customer.version,
        type: addressToDelete.type,
        onSuccess,
        onError,
      };
      dispatch(deleteAddress(request));
    }
  };

  const handleDefaultAddressChange = (id: string, checked: boolean, type: 'shipping' | 'billing'): void => {
    const onSuccess = (): void => {
      dispatch(setAlert({ message: `Your default ${type} address was successfully changed`, severity: 'success' }));
    };
    const onError = (error: ServerError): void => {
      dispatch(setAlert({ message: error.message, severity: 'error' }));
    };
    const request: SetDefaultAddressRequest = {
      id: customer.id,
      addressId: checked ? id : undefined,
      version: customer.version,
      type,
      onSuccess,
      onError,
    };
    dispatch(setDefaultAddress(request));
  };

  return (
    <>
      <Accordion expanded={expanded} onChange={(): void => setExpanded(!expanded)}>
        <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography variant="h6">Shipping</Typography>
        </AccordionSummary>
        {shippingAddresses.map((address: Address) => {
          return (
            <AccordionItem
              defaultId={defaultShippingAddressId ?? ''}
              address={address}
              onDeleteRequested={(): void => {
                setAddressToDelete({ id: address.id ?? '', type: 'shipping' });
                setOpenConfirmationModal(true);
              }}
              onDefaultChange={(id, checked): void => handleDefaultAddressChange(id, checked, 'shipping')}
              key={address.id}
              onEditRequest={(): void => {
                setAddressToEdit(addresses.find((a) => address.id === a.id));
                setOpenAddressModal(true);
              }}
            />
          );
        })}
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography variant="h6">Billing</Typography>
        </AccordionSummary>
        {billingAddresses.map((address: Address) => {
          return (
            <AccordionItem
              defaultId={defaultBillingAddressId ?? ''}
              address={address}
              onDeleteRequested={(): void => {
                setAddressToDelete({ id: address.id ?? '', type: 'billing' });
                setOpenConfirmationModal(true);
              }}
              onDefaultChange={(id, checked): void => handleDefaultAddressChange(id, checked, 'billing')}
              key={address.id}
              onEditRequest={(): void => {
                setAddressToEdit(addresses.find((a) => address.id === a.id));
                setOpenAddressModal(true);
              }}
            />
          );
        })}
      </Accordion>
      <ConfirmationModal
        title={messages.deleteConfirmation.title}
        description={messages.deleteConfirmation.description}
        positiveButton={messages.deleteConfirmation.delete}
        negativeButton={messages.deleteConfirmation.cancel}
        deleteConfirmation={true}
        open={openConfirmationModal}
        setOpen={(open): void => setOpenConfirmationModal(open)}
        onPositiveClick={deleteAddressConfirmed}
        onNegativeClick={(): void => {
          setOpenConfirmationModal(false);
          setAddressToDelete(undefined);
        }}
      />
      {addressToEdit && (
        <UpdateAddressModal
          open={openAddressModal}
          setOpen={(open): void => setOpenAddressModal(open)}
          customer={customer}
          address={addressToEdit}
        />
      )}
    </>
  );
};
