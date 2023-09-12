import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ProductProjection, ProductVariant } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addLineItemToCart } from '../../slices/cart/slice';
import { findPriceWithCurrencyCode } from '../../utils/productsUtils';
import { removeTags } from '../../utils/helpers';
import { LINKS } from '../consts';

import { ProductImage } from './ProductImage';
import { ProductPrice } from './ProductPrice';
import { ProductVariantSelector } from './ProductVariantSelector';

import './styles.scss';

type CatalogProductProps = {
  productProjection: ProductProjection;
};

export const CatalogProduct: React.FC<CatalogProductProps> = ({ productProjection }): JSX.Element => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(productProjection.masterVariant);
  const { localization, currency } = useAppSelector((state) => state.settings);
  const {
    progress: { addingLineItem },
  } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const isButtonAddToCartDisabled = !findPriceWithCurrencyCode(selectedVariant.prices, currency);
  const navigate = useNavigate();
  const { id, slug } = productProjection;
  const productUrl = `${LINKS.product}/${id}/${slug[localization]}`;

  const handleProductClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    navigate(productUrl);
  };
  const handleClickAddToCart = (): void => {
    // TODO add onSuccess and onError
    dispatch(addLineItemToCart({ productId: id, variantId: selectedVariant.id, quantity: 1 }));
  };
  const allVariants = [productProjection.masterVariant, ...productProjection.variants];

  return (
    <Card className="catalog-product">
      <CardActionArea href={productUrl} onClick={handleProductClick}>
        <ProductImage productProjection={productProjection} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {productProjection.name[localization]}
          </Typography>
          {productProjection.description && (
            <Typography className="catalog-product__description">
              {removeTags(productProjection.description[localization])}
            </Typography>
          )}
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
          <LoadingButton
            loading={addingLineItem === id}
            disabled={isButtonAddToCartDisabled}
            fullWidth
            variant="contained"
            onClick={handleClickAddToCart}
          >
            Add to Cart
          </LoadingButton>
        </Stack>
      </CardContent>
    </Card>
  );
};
