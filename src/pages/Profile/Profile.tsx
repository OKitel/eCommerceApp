import { useState } from 'react';
import { Box, Paper, Typography, Divider, Button } from '@mui/material';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { PersonalInfoSection } from '../../components/PersonalInfoSection/PersonalInfoSection';
import './styles.scss';
import { Customer } from '@commercetools/platform-sdk';
import { useAppSelector } from '../../store/hooks';
import { PasswordChangeModal } from '../../components/PasswordChangeModal/PasswordChangeModal';
import { AddressesAccordion } from '../../components/AddressesAccordion/AddressAccordion';
import AddHomeRoundedIcon from '@mui/icons-material/AddHomeRounded';
import { AddAddressModal } from '../../components/AddressModal/AddAddressModal';

export const Profile: React.FC = (): React.ReactElement => {
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const maybeCustomer: Customer | null = useAppSelector((state) => state.customer.customerData);
  if (!maybeCustomer) {
    return <></>;
  }
  const customer: Customer = maybeCustomer;

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <Paper elevation={3} sx={{ padding: '2rem', mt: 5, mb: 4, ml: 2, mr: 2 }}>
          <h2 className="profile-title">Profile Settings</h2>
          <PersonalInfoSection customer={customer} />
          <Divider />
          <Typography variant="h4" className="section-title">
            Password
          </Typography>
          <div className="password-btn_container">
            <Button variant="contained" color="primary" onClick={(): void => setOpenChangePasswordModal(true)}>
              <LockRoundedIcon />
              &nbsp;Change password
            </Button>
          </div>
          <Divider />
          <Typography variant="h4" className="section-title">
            Addresses
          </Typography>
          <div className="new-address-btn_container">
            <Button variant="contained" color="primary" onClick={(): void => setOpenAddressModal(true)}>
              <AddHomeRoundedIcon />
              &nbsp;Add new
            </Button>
          </div>
          <AddressesAccordion customer={customer} />
        </Paper>
      </Box>
      <PasswordChangeModal
        open={openChangePasswordModal}
        setOpen={(open): void => setOpenChangePasswordModal(open)}
        customer={customer}
      />
      <AddAddressModal
        open={openAddressModal}
        setOpen={(open): void => setOpenAddressModal(open)}
        customer={customer}
      />
    </>
  );
};
