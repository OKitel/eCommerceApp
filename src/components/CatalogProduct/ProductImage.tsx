import React from 'react';
import { CardMedia } from '@mui/material';
import { ProductProjection } from '@commercetools/platform-sdk';

import { useAppSelector } from '../../store/hooks';

type ProductImageProps = {
  product: ProductProjection;
};

export const ProductImage: React.FC<ProductImageProps> = ({ product }): JSX.Element => {
  const localization = useAppSelector((state) => state.settings.localization);

  const { images } = product.masterVariant;
  let firstImageUrl: string | undefined = undefined;
  let firstImageAlt: string | undefined = undefined;

  if (images && images.length) {
    firstImageUrl = images[0].url;
    firstImageAlt = product.name[localization];
  }

  return (
    <CardMedia
      className="catalog-product__preview-image"
      component="img"
      image={firstImageUrl}
      alt={firstImageAlt}
      sx={{ objectFit: 'contain' }}
    />
  );
};
