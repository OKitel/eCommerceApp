import React, { useState } from 'react';
import { Button, Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import { ProductProjection, ProductVariant } from '@commercetools/platform-sdk';

import { useAppSelector } from '../../store/hooks';
import { ProductImage } from './ProductImage';
import { ProductPrice } from './ProductPrice';
import { ProductVariantSelector } from './ProductVariantSelector';
import { findPriceWithCurrencyCode } from '../../utils/productsUtils';

import './styles.scss';
import { useNavigate } from 'react-router-dom';

type CatalogProductProps = {
  productProjection: ProductProjection;
};

export const CatalogProduct: React.FC<CatalogProductProps> = ({ productProjection }): JSX.Element => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(productProjection.masterVariant);
  const { localization, currency } = useAppSelector((state) => state.settings);
  const isButtonAddToCartDisabled = !findPriceWithCurrencyCode(selectedVariant.prices, currency);
  const navigate = useNavigate();
  const { id, slug } = productProjection;
  const productUrl = `/product/${id}/${slug[localization]}`;

  const handleProductClick = (): void => {
    navigate(productUrl);
  };
  const allVariants = [productProjection.masterVariant, ...productProjection.variants];

  return (
    <Card className="catalog-product">
      <CardActionArea onClick={handleProductClick}>
        <ProductImage productProjection={productProjection} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {productProjection.name[localization]}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent className="catalog-product__controls">
        <Stack spacing={2} my={2}>
          <ProductVariantSelector
            allVariants={allVariants}
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
