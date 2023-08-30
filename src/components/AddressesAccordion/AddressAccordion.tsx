import { Accordion, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import './styles.scss';
import { useState } from 'react';
import { Customer, Address } from '@commercetools/platform-sdk';
import { AccordionItem } from './AccordionItem';

type Props = {
  customer: Customer;
};
export const AddressesAccordion: React.FC<Props> = ({ customer }: Props): React.ReactElement => {
  const [expanded, setExpanded] = useState<string | false>('panel1');
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    console.log(event);
    setExpanded(isExpanded ? panel : false);
  };
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

  return (
    <>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography variant="h6">Shipping</Typography>
        </AccordionSummary>
        {shippingAddresses.map((address: Address) => {
          return <AccordionItem defaultId={defaultShippingAddressId ?? ''} address={address} key={address.id} />;
        })}
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography variant="h6">Billing</Typography>
        </AccordionSummary>
        {billingAddresses.map((address: Address) => {
          return <AccordionItem defaultId={defaultBillingAddressId ?? ''} address={address} key={address.id} />;
        })}
      </Accordion>
    </>
  );
};
