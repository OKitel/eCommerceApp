import { useState } from 'react';
import { ProductData, ProductVariant } from '@commercetools/platform-sdk';
import { Typography, IconButton, Box, Rating } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeLineItemFromCart } from '../../slices/cart/slice';
import { setAlert } from '../../slices/alerts/slice';
import { ServerError } from '../../api/types';

import { ProductVariantSelector } from '../CatalogProduct/ProductVariantSelector';
import { ProductPrice } from '../CatalogProduct/ProductPrice';
import { ProductButtonAddToCart } from '../ProductButtonAddToCart/ProductButtonAddToCart';

import './styles.scss';

type Props = {
  productData: ProductData;
  productId: string;
};

export const ProductDetails: React.FC<Props> = ({ productData, productId }: Props): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { localization } = useAppSelector((state) => state.settings);
  const {
    activeCart,
    progress: { modifyingCart },
  } = useAppSelector((state) => state.cart);
  const [like, setLike] = useState(false);
  const [ratingValue] = useState<number | null>(null);
  const allVariants = [productData.masterVariant, ...productData.variants];
  const manufacturer = productData.masterVariant.attributes?.find((atr) => atr.name === 'manufacturer');
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(productData.masterVariant);
  const variantSkusInCart = activeCart?.lineItems.map((lineItem) => lineItem.variant.sku) || [];
  const isSelectedVariantInCart = variantSkusInCart.includes(selectedVariant.sku);

  const onSuccess = (): void => {
    dispatch(setAlert({ message: 'Product removed from cart', severity: 'success' }));
  };
  const onError = (error: ServerError): void => {
    dispatch(setAlert({ message: error.message, severity: 'error' }));
  };
  const handleClickRemoveFromCart = (): void => {
    const lineItemFound = activeCart?.lineItems.find((lineItem) => lineItem.variant.sku === selectedVariant.sku);
    if (lineItemFound) {
      const { id, quantity } = lineItemFound;
      dispatch(removeLineItemFromCart({ lineItemId: id, quantity, onSuccess, onError }));
    } else {
      dispatch(setAlert({ message: 'Something went wrong. The product was not found in the cart', severity: 'error' }));
    }
  };

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
      <ProductButtonAddToCart productId={productId} selectedVariant={selectedVariant} />
      {isSelectedVariantInCart && (
        <LoadingButton loading={modifyingCart} variant="outlined" color="error" onClick={handleClickRemoveFromCart}>
          Remove from cart
        </LoadingButton>
      )}
    </>
  );
};
