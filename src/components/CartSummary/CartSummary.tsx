import { useMemo } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';
import { LINKS } from '../consts';
import { Cart } from '@commercetools/platform-sdk';
import {
  findDiscountPriceWithCurrencyCode,
  findPriceWithCurrencyCode,
  formatPriceCents,
} from '../../utils/productsUtils';

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
          const currencyPrice = findPriceWithCurrencyCode(item.prices, currency);
          const currencyPriceWithDiscount = findDiscountPriceWithCurrencyCode(item.prices, currency);

          if (currencyPriceWithDiscount) {
            const discountPriceValue = currencyPriceWithDiscount.value.centAmount;
            return { price: discountPriceValue, quantity: item.quantity };
          }
          if (currencyPrice) {
            const priceValue = currencyPrice.value.centAmount;
            return { price: priceValue, quantity: item.quantity };
          }
          throw new Error(`No price in ${currency} found`);
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
        <Typography variant="h3">{totalPrice}</Typography>
      </Box>
      <Button variant="contained">Delivery and payment</Button>
      <Button component={RouterLink} to={LINKS.catalog} color="secondary" variant="contained">
        Continue shopping
      </Button>
    </Box>
  );
};
