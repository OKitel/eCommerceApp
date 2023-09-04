import React from 'react';
import { Typography, Badge, Box } from '@mui/material';
import { ProductVariant } from '@commercetools/platform-sdk';

import { useAppSelector } from '../../store/hooks';
import {
  findDiscountPriceWithCurrencyCode,
  findPriceWithCurrencyCode,
  formatPriceCents,
} from '../../utils/productsUtils';
import { TEXT_CONTENT } from '../consts';

type ProductPriceProps = {
  selectedVariant: ProductVariant;
};

export const ProductPrice: React.FC<ProductPriceProps> = ({ selectedVariant }): JSX.Element => {
  const localization = useAppSelector((state) => state.settings.localization);
  const currency = useAppSelector((state) => state.settings.currency);

  const { prices } = selectedVariant;
  const currencyPrice = findPriceWithCurrencyCode(prices, currency);
  const currencyPriceWithDiscount = findDiscountPriceWithCurrencyCode(prices, currency);
  const priceValue = currencyPrice
    ? formatPriceCents(currencyPrice.value.centAmount, localization, currency)
    : TEXT_CONTENT.products.emptyPrice;

  const discountPriceValue = currencyPriceWithDiscount
    ? formatPriceCents(currencyPriceWithDiscount.value.centAmount, localization, currency)
    : TEXT_CONTENT.products.emptyPrice;

  return (
    <>
      {!currencyPriceWithDiscount && (
        <Typography align="center" fontSize={23} fontWeight="bold">
          {priceValue}
        </Typography>
      )}
      {currencyPriceWithDiscount && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Typography
              align="center"
              fontSize={18}
              fontWeight="bold"
              sx={{ color: 'gray', textDecoration: 'line-through', marginTop: 0, lineHeight: 1 }}
            >
              {priceValue}
            </Typography>
            <Badge
              badgeContent="Sale -10%"
              color="secondary"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Typography
                align="center"
                fontSize={23}
                fontWeight="bold"
                sx={{ pt: '0.3rem', marginTop: 0, padding: '0 2rem' }}
              >
                {discountPriceValue}
              </Typography>
            </Badge>
          </Box>
        </>
      )}
    </>
  );
};
