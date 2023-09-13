import React from 'react';
import { ProductProjection, ProductVariant } from '@commercetools/platform-sdk';
import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CheckIcon from '@mui/icons-material/check';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addLineItemToCart } from '../../slices/cart/slice';
import { setAlert } from '../../slices/alerts/slice';
import { findPriceWithCurrencyCode } from '../../utils/productsUtils';
import { ServerError } from '../../api/types';

type Props = {
  productProjection: ProductProjection;
  selectedVariant: ProductVariant;
};

export const ProductButton: React.FC<Props> = ({ productProjection, selectedVariant }): JSX.Element => {
  const dispatch = useAppDispatch();
  const { currency } = useAppSelector((state) => state.settings);
  const {
    activeCart,
    progress: { addingLineItem },
  } = useAppSelector((state) => state.cart);
  const { id } = productProjection;
  const variantSkusInCart = activeCart?.lineItems.map((lineItem) => lineItem.variant.sku) || [];
  const isButtonAddToCartDisabled = !findPriceWithCurrencyCode(selectedVariant.prices, currency);

  const onSuccess = (): void => {
    dispatch(setAlert({ message: 'Product added to the cart', severity: 'success' }));
  };
  const onError = (error: ServerError): void => {
    dispatch(setAlert({ message: error.message, severity: 'error' }));
  };
  const handleClickAddToCart = (): void => {
    dispatch(addLineItemToCart({ productId: id, variantId: selectedVariant.id, quantity: 1, onSuccess, onError }));
  };

  if (variantSkusInCart.includes(selectedVariant.sku)) {
    return (
      <Button variant="outlined" startIcon={<CheckIcon />} sx={{ cursor: 'default', pointerEvents: 'none' }}>
        In cart
      </Button>
    );
  }

  return (
    <LoadingButton
      loading={addingLineItem === id}
      startIcon={<AddShoppingCartIcon />}
      loadingPosition="start"
      disabled={isButtonAddToCartDisabled}
      fullWidth
      variant="contained"
      onClick={handleClickAddToCart}
    >
      Add to Cart
    </LoadingButton>
  );
};
