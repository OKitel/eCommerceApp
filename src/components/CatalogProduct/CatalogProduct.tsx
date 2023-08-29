import React, { useState } from 'react';
import { Button, Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import { ProductProjection, ProductVariant } from '@commercetools/platform-sdk';

import { useAppSelector } from '../../store/hooks';
import { ProductImage } from './ProductImage';
import { ProductPrice } from './ProductPrice';
import { ProductVariantSelector } from './ProductVariantSelector';
import { findPriceWithCurrencyCode } from '../../utils/productsUtils';

import './styles.scss';

type CatalogProductProps = {
  product: ProductProjection;
};

export const CatalogProduct: React.FC<CatalogProductProps> = ({ product }): JSX.Element => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.masterVariant);
  const { localization, currency } = useAppSelector((state) => state.settings);
  const isButtonAddToCartDisabled = !findPriceWithCurrencyCode(selectedVariant.prices, currency);

  return (
    <Card className="catalog-product">
      <CardActionArea>
        <ProductImage product={product} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name[localization]}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent className="catalog-product__controls">
        <Stack spacing={2} my={2}>
          <ProductVariantSelector
            product={product}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
          />
          <ProductPrice selectedVariant={selectedVariant} />
          <Button disabled={isButtonAddToCartDisabled} fullWidth variant="contained">
            Add to Cart
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
