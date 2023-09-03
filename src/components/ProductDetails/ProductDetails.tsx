import { Button, Typography, IconButton, Box } from '@mui/material';
import { ProductVariantSelector } from '../CatalogProduct/ProductVariantSelector';
import { ProductPrice } from '../CatalogProduct/ProductPrice';
import { ProductData, ProductVariant } from '@commercetools/platform-sdk';
import { useAppSelector } from '../../store/hooks';
import { useState } from 'react';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import './styles.scss';

type Props = {
  product: ProductData;
};

export const ProductDetails: React.FC<Props> = ({ product }: Props): React.ReactElement => {
  const { localization } = useAppSelector((state) => state.settings);
  const [like, setLike] = useState(false);
  const allVariants = [product.masterVariant, ...product.variants];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.masterVariant);
  return (
    <>
      <Box className="details-title_container">
        <Typography variant="h5">{product.name[localization]}</Typography>
        <Box className="details-icons_container">
          <IconButton color="primary" aria-label="share product" size="large">
            <ShareRoundedIcon />
          </IconButton>
          <IconButton color="primary" aria-label="like product" onClick={(): void => setLike(!like)} size="large">
            {like ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
          </IconButton>
        </Box>
      </Box>
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
