import { useCallback, useState } from 'react';
import { Alert, Box, Button, Chip, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Cart } from '@commercetools/platform-sdk';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { LINKS } from '../consts';
import { formatPriceCents, getLineItemsFullPriceTotalCentAmount } from '../../utils/productsUtils';
import { setAlert } from '../../slices/alerts/slice';
import { clearCart } from '../../slices/cart/slice';
import { ServerError } from '../../api/types';
import { messages } from '../../messages';

import { ConfirmationModal } from '../ConfirmationModal/ConfirmationModal';
import { InputDiscountCode } from './InputDiscountCode';

import './styles.scss';

type Props = {
  cart: Cart;
};

export const CartSummary: React.FC<Props> = ({ cart }: Props): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { localization } = useAppSelector((state) => state.settings);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const { centAmount: cartTotalCentAmount, currencyCode } = cart.totalPrice;
  const lineItemsFullPriceTotalCentAmount = getLineItemsFullPriceTotalCentAmount(cart.lineItems);
  const isDiscountApplied = !!cart.discountCodes.length;
  const isDiscountTermsFulfilled = cartTotalCentAmount < lineItemsFullPriceTotalCentAmount;

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

  const renderTotalCartPrice = (): React.ReactElement => {
    if (isDiscountApplied && isDiscountTermsFulfilled) {
      return (
        <Box textAlign="center">
          <Box sx={{ color: 'gray', textDecoration: 'line-through', lineHeight: 1 }}>
            {formatPriceCents(lineItemsFullPriceTotalCentAmount, localization, cart.totalPrice.currencyCode)}
            <Chip label="Promo applied" size="small" color="secondary" sx={{ marginLeft: '0.5rem' }} />
          </Box>
          <Typography variant="h3">{formatPriceCents(cartTotalCentAmount, localization, currencyCode)}</Typography>
        </Box>
      );
    }

    return <Typography variant="h3">{formatPriceCents(cartTotalCentAmount, localization, currencyCode)}</Typography>;
  };

  return (
    <>
      <Box className="cart-summary_container">
        <Box className="total-price_wrapper">
          <Typography variant="h5">Total price</Typography>
          {renderTotalCartPrice()}
        </Box>
        {isDiscountApplied && !isDiscountTermsFulfilled && (
          <Alert severity="error">
            You need to fulfill the terms of the applied promo code to get the discounted price
          </Alert>
        )}
        <InputDiscountCode />
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
