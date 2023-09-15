import { useMemo, useCallback, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Cart } from '@commercetools/platform-sdk';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { LINKS } from '../consts';
import { formatPriceCents, getFinalPrice } from '../../utils/productsUtils';
import { setAlert } from '../../slices/alerts/slice';
import { clearCart } from '../../slices/cart/slice';
import { ServerError } from '../../api/types';
import { messages } from '../../messages';

import { ConfirmationModal } from '../ConfirmationModal/ConfirmationModal';

import './styles.scss';

type Props = {
  cart: Cart;
};

export const CartSummary: React.FC<Props> = ({ cart }: Props): React.ReactElement => {
  const localization = useAppSelector((state) => state.settings.localization);
  const currency = useAppSelector((state) => state.settings.currency);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const dispatch = useAppDispatch();
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

  const onSuccess = useCallback((): void => {}, []);
  const onError = useCallback(
    (error: ServerError): void => {
      dispatch(setAlert({ message: error.message, severity: 'error' }));
    },
    [dispatch],
  );
  const handleClickClearCart = (): void => {
    dispatch(clearCart({ onSuccess, onError }));
  };

  return (
    <>
      <Box className="cart-summary_container">
        <Box className="total-price_wrapper">
          <Typography variant="h5">Total price</Typography>
          <Typography variant="h3">{totalPrice}</Typography>
        </Box>
        <Button variant="contained">Delivery and payment</Button>
        <Button component={RouterLink} to={LINKS.catalog} color="secondary" variant="contained">
          Continue shopping
        </Button>
        <Button variant="contained" color="error" onClick={(): void => setOpenConfirmationModal(true)}>
          Clear Shopping Cart
        </Button>
      </Box>
      <ConfirmationModal
        title={messages.clearCartConfirmation.title}
        description={messages.clearCartConfirmation.description}
        positiveButton={messages.clearCartConfirmation.delete}
        negativeButton={messages.clearCartConfirmation.cancel}
        deleteConfirmation={true}
        open={openConfirmationModal}
        setOpen={(open): void => setOpenConfirmationModal(open)}
        onPositiveClick={handleClickClearCart}
        onNegativeClick={(): void => {
          setOpenConfirmationModal(false);
        }}
      />
    </>
  );
};
