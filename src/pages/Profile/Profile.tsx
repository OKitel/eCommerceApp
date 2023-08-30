import { useState } from 'react';
import { Box, Paper, Typography, Divider, Button } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import { PersonalInfoSection } from '../../components/PesonalInfoSection/PersonalInfoSection';
import './styles.scss';
import { Customer } from '@commercetools/platform-sdk';
import { useAppSelector } from '../../store/hooks';
import { PasswordChangeModal } from '../../components/PasswordChangeModal/PasswordChangeModal';

export const Profile: React.FC = (): React.ReactElement => {
  const [openModal, setOpenModal] = useState(false);
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

          <div className="password-btn-container">
            <Button variant="contained" color="primary" onClick={(): void => setOpenModal(true)}>
              Change password &nbsp;
              <EditRoundedIcon />
            </Button>
          </div>
          <Divider />
          <Typography variant="h4" className="section-title">
            Addresses
          </Typography>
          <h5>Shipping addresses</h5>
          {/* <h6>Show default</h6>
          <p>street, city, state, zip code, country</p>
          <p>Edit button</p>
          <p>Save button</p> 
          <p>Delete button</p>*/}

          <h5>Billing addresses</h5>
          {/* <h6>Show default</h6>
          <p>street, city, state, zip code, country</p>
          <p>Edit button</p>
          <p>Save button</p>
          <p>Delete button</p> */}
        </Paper>
      </Box>
      <PasswordChangeModal open={openModal} setOpen={(open): void => setOpenModal(open)} customer={customer} />
    </>
  );
};
