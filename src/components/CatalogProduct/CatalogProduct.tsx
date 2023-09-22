import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import { ProductProjection, ProductVariant } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';
import { removeTags } from '../../utils/helpers';
import { LINKS } from '../consts';

import { ProductImage } from './ProductImage';
import { ProductPrice } from './ProductPrice';
import { ProductVariantSelector } from './ProductVariantSelector';
import { ProductButtonAddToCart } from '../ProductButtonAddToCart/ProductButtonAddToCart';

import './styles.scss';

type CatalogProductProps = {
  productProjection: ProductProjection;
};

export const CatalogProduct: React.FC<CatalogProductProps> = ({ productProjection }): JSX.Element => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(productProjection.masterVariant);
  const { localization } = useAppSelector((state) => state.settings);
  const navigate = useNavigate();
  const { id, slug } = productProjection;
  const productUrl = `${LINKS.product}/${id}/${slug[localization]}`;

  const handleProductClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    navigate(productUrl);
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
          <ProductButtonAddToCart productId={id} selectedVariant={selectedVariant} />
        </Stack>
      </CardContent>
    </Card>
  );
};
