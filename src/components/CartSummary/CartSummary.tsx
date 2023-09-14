import { useMemo } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Cart } from '@commercetools/platform-sdk';

import { useAppSelector } from '../../store/hooks';
import { LINKS } from '../consts';
import { formatPriceCents, getFinalPrice } from '../../utils/productsUtils';

import './styles.scss';

type Props = {
  cart: Cart;
};

export const CartSummary: React.FC<Props> = ({ cart }: Props): React.ReactElement => {
  const localization = useAppSelector((state) => state.settings.localization);
  const currency = useAppSelector((state) => state.settings.currency);

  const totalPrice: string = useMemo(() => {
    try {
      const totalPriceInCent = cart.lineItems
        .map((item) => ({ prices: item.variant.prices, quantity: item.quantity }))
        .map((item) => {
          const price = getFinalPrice(item.prices, currency);
          return { price: price, quantity: item.quantity };
        })
        .reduce((prev, cur) => {
          return prev + cur.price * cur.quantity;
        }, 0);
      return formatPriceCents(totalPriceInCent, localization, currency);
    } catch {
      return formatPriceCents(cart.totalPrice.centAmount, localization, currency);
    }
  }, [currency, localization, cart.totalPrice, cart.lineItems]);

  return (
    <Box className="cart-summary_container">
      <Box className="total-price_wrapper">
        <Typography variant="h5">Total price</Typography>
        <Typography variant="h3">{totalPrice}</Typography>
      </Box>
      <Button variant="contained">Delivery and payment</Button>
      <Button component={RouterLink} to={LINKS.catalog} color="secondary" variant="contained">
        Continue shopping
      </Button>
    </Box>
  );
};
