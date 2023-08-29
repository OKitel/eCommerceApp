import { useState } from 'react';
import { Box, Paper, Typography, Divider, Button } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import { PersonalInfoSection } from '../../components/PesonalInfoSection/PersonalInfoSection';
import { Modal } from '../../components/Modal/Modal';
import './styles.scss';

export const Profile: React.FC = (): React.ReactElement => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <Paper elevation={3} sx={{ padding: '2rem', mt: 4 }}>
          <h2 className="profile-title">Profile Settings</h2>
          <PersonalInfoSection />
          <Divider />
          <Typography variant="h4" className="section-title">
            Password
          </Typography>

          <div className="password-btn-container">
            <Button variant="contained" color="primary" onClick={(): void => setOpenModal(true)}>
              Change password <EditRoundedIcon />
            </Button>
          </div>

          {/* <h5> Modal window</h5>
          <h5>check current password</h5>
          <h5>new password/confirm new password</h5>
          <p>Save button</p>
          <p>Cancel button</p> */}
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
      <Modal open={openModal} setOpen={(open): void => setOpenModal(open)} />
    </>
  );
};
