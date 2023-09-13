import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { LINKS } from '../consts';

export const CartSummary = (): React.ReactElement => {
  return (
    <Box
      sx={{
        flex: '30%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Total price</Typography>
        <Typography variant="h3">$123</Typography>
      </Box>
      <Button variant="contained">Delivery and payment</Button>
      <Button component={RouterLink} to={LINKS.catalog} color="secondary" variant="contained">
        Continue shopping
      </Button>
    </Box>
  );
};
