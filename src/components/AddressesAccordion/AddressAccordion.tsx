import { Accordion, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import './styles.scss';
import { useState } from 'react';
import { Customer, Address } from '@commercetools/platform-sdk';
import { AccordionItem } from './AccordionItem';
import { ConfirmationModal } from '../ConfirmationModal/ConfirmationModal';
import { messages } from '../../messages';
import { deleteAddress } from '../../slices/customer/slice';
import { DeleteAddressRequest } from '../../slices/customer/types';
import { setAlert } from '../../slices/alerts/slice';
import { ServerError } from '../../api/types';
import { useAppDispatch } from '../../store/hooks';

type Props = {
  customer: Customer;
};
export const AddressesAccordion: React.FC<Props> = ({ customer }: Props): React.ReactElement => {
  const [expanded, setExpanded] = useState(true);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<{ id: string; type: string } | undefined>();
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
        actionType: addressToDelete.type === 'shipping' ? 'removeShippingAddressId' : 'removeBillingAddressId',
        onSuccess,
        onError,
      };
      dispatch(deleteAddress(request));
    }
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
              key={address.id}
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
              key={address.id}
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
    </>
  );
};
