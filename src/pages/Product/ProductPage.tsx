import { Box, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { URL_PARAMS } from '../../components/consts';
import { getProductById } from '../../slices/product/slice';
import { getCategories } from '../../slices/categories/slice';

import { ChipBreadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProgressLoader } from '../../components/ProgressLoader/ProgressLoader';
import { SwiperComponent } from '../../components/Swiper/Swiper';
import { ProductDetails } from '../../components/ProductDetails/ProductDetails';

import './styles.scss';

export const ProductPage: React.FC = (): React.ReactElement => {
  const { [URL_PARAMS.productId]: productId } = useParams();
  const dispatch = useAppDispatch();

  const { categories } = useAppSelector((state) => state.categories);
  const { product: maybeProduct, progress: progressProduct } = useAppSelector((state) => state.product);
  const { localization } = useAppSelector((state) => state.settings);

  useEffect(() => {
    if (!categories) {
      dispatch(getCategories());
    }
  }, [categories, dispatch]);

  useEffect(() => {
    if (productId && productId !== maybeProduct?.id) {
      dispatch(getProductById(productId));
    }
  }, [dispatch, maybeProduct, productId]);

  if (progressProduct) {
    return (
      <Container>
        <ProgressLoader />
      </Container>
    );
  }

  if (!productId || maybeProduct === null) {
    return (
      <Container>
        <Box marginY={3}>
          <ChipBreadcrumbs />
        </Box>
        <Typography variant="h1" gutterBottom>
          No product found
        </Typography>
      </Container>
    );
  }
  const currentProductData = maybeProduct.masterData.current;
  const images = [];

  images.push(...(currentProductData.masterVariant.images || []));
  currentProductData.variants.forEach((variant) => {
    images.push(...(variant.images || []));
  });

  return (
    <>
      <Container>
        <Box marginY={3}>
          <ChipBreadcrumbs />
        </Box>

        <Typography variant="h3" gutterBottom>
          {currentProductData.name[localization]}
        </Typography>

        <Box className="product-container">
          <SwiperComponent images={images} />

          <Box className="details-container">
            <ProductDetails productData={currentProductData} productId={productId} />
          </Box>
        </Box>
        {currentProductData.description && (
          <Box pb={3}>
            <Typography gutterBottom variant="h5" className="description-title">
              Description
            </Typography>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: currentProductData.description[localization] }}
            ></Typography>
          </Box>
        )}
      </Container>
    </>
  );
};
