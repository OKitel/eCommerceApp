import { Button, Typography, IconButton, Box, Rating } from '@mui/material';
import { ProductData, ProductVariant } from '@commercetools/platform-sdk';
import { useState } from 'react';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';

import { useAppSelector } from '../../store/hooks';

import { ProductVariantSelector } from '../CatalogProduct/ProductVariantSelector';
import { ProductPrice } from '../CatalogProduct/ProductPrice';

import './styles.scss';

type Props = {
  productData: ProductData;
  productId: string;
};

export const ProductDetails: React.FC<Props> = ({ productData }: Props): React.ReactElement => {
  const { localization } = useAppSelector((state) => state.settings);
  const [like, setLike] = useState(false);
  const [ratingValue] = useState<number | null>(null);
  const allVariants = [productData.masterVariant, ...productData.variants];
  const manufacturer = productData.masterVariant.attributes?.find((atr) => atr.name === 'manufacturer');
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(productData.masterVariant);
  return (
    <>
      <Box className="details-title_container">
        <Typography variant="h5">{productData.name[localization]}</Typography>
        <Box className="details-icons_container">
          <IconButton color="primary" aria-label="share product" size="large">
            <ShareRoundedIcon />
          </IconButton>
          <IconButton color="primary" aria-label="like product" onClick={(): void => setLike(!like)} size="large">
            {like ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
          </IconButton>
        </Box>
      </Box>
      <Box className="details-rating">
        <Typography variant="caption">Be the first to buy this product</Typography>
        <Rating value={ratingValue} readOnly />
      </Box>
      {manufacturer && (
        <Box className="details-rating">
          <Typography variant="caption">Made in {manufacturer.value.label[localization]}</Typography>
        </Box>
      )}
      <ProductVariantSelector
        allVariants={allVariants}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
      />

      <ProductPrice selectedVariant={selectedVariant} />
      <Button variant="contained">
        <ShoppingCartRoundedIcon /> &nbsp;Add to cart
      </Button>
    </>
  );
};
