import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { LINKS } from '../../components/consts';
import emptyCart from '../../assets/images/empty_cart.png';

import './styles.scss';

export const EmptyCart = (): React.ReactElement => {
  return (
    <Box className="empty-cart_container">
      <Typography variant="h2" className="empty-cart_title">
        Your cart is empty
      </Typography>
      <img className="empty-cart-img" src={emptyCart} alt="empty cart" />
      <Typography variant="body1" className="empty-cart_text">
        Time to &nbsp;
        <RouterLink to={LINKS.catalog} className="empty-cart_link">
          add some items
        </RouterLink>
        &nbsp; to your cart and make it smile!
      </Typography>
      <Button component={RouterLink} to={LINKS.catalog} color="primary" variant="contained">
        Start Shopping
      </Button>
    </Box>
  );
};
