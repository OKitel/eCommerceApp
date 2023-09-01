import React from 'react';
import { CardMedia } from '@mui/material';
import { ProductProjection } from '@commercetools/platform-sdk';

import { useAppSelector } from '../../store/hooks';

type ProductImageProps = {
  productProjection: ProductProjection;
};

export const ProductImage: React.FC<ProductImageProps> = ({ productProjection }): JSX.Element => {
  const localization = useAppSelector((state) => state.settings.localization);

  const { images } = productProjection.masterVariant;
  let firstImageUrl: string | undefined = undefined;
  let firstImageAlt: string | undefined = undefined;

  if (images && images.length) {
    firstImageUrl = images[0].url;
    firstImageAlt = productProjection.name[localization];
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
