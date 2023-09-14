import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { LINKS } from '../../components/consts';
import emptyCart from '../../assets/images/empty_cart.png';

import './styles.scss';

export const EmptyCart = (): React.ReactElement => {
  return (
    <Box className="empty-cart_container">
      <Typography variant="h2">Your cart is empty</Typography>
      <img className="empty-cart-img" src={emptyCart} alt="empty cart" />
      <Button component={RouterLink} to={LINKS.catalog} color="primary" variant="contained">
        Back to catalog
      </Button>
    </Box>
  );
};
