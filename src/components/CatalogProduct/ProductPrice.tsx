import React from 'react';
import { Typography } from '@mui/material';
import { ProductVariant } from '@commercetools/platform-sdk';

import { useAppSelector } from '../../store/hooks';
import { findPriceWithCurrencyCode, formatPriceCents } from '../../utils/productsUtils';
import { TEXT_CONTENT } from '../consts';

type ProductPriceProps = {
  selectedVariant: ProductVariant;
};

export const ProductPrice: React.FC<ProductPriceProps> = ({ selectedVariant }): JSX.Element => {
  const localization = useAppSelector((state) => state.settings.localization);
  const currency = useAppSelector((state) => state.settings.currency);

  const { prices } = selectedVariant;
  const currencyPrice = findPriceWithCurrencyCode(prices, currency);
  const priceValue = currencyPrice
    ? formatPriceCents(currencyPrice.value.centAmount, localization, currency)
    : TEXT_CONTENT.products.emptyPrice;

  return (
    <Typography align="center" fontSize={23} fontWeight="bold">
      {priceValue}
    </Typography>
  );
};
