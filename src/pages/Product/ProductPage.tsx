import { Box, Container, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { URL_PARAMS } from '../../components/consts';
import { getProduct } from '../../slices/product/slice';
import { ChipBreadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProgressLoader } from '../../components/ProgressLoader/ProgressLoader';

export const ProductPage: React.FC = (): React.ReactElement => {
  const { [URL_PARAMS.productId]: productId } = useParams();
  const dispatch = useAppDispatch();
  const { product: maybeProduct, progress: progressProduct } = useAppSelector((state) => state.product);
  const { localization } = useAppSelector((state) => state.settings);
  useEffect(() => {
    if (productId && productId !== maybeProduct?.id) {
      dispatch(getProduct(productId));
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

  return (
    <>
      <Container>
        <Typography variant="h1" gutterBottom>
          Product
        </Typography>
        <Box marginY={3}>
          <ChipBreadcrumbs />
        </Box>
        <Typography variant="h3" gutterBottom>
          {maybeProduct.masterData.current.name[localization]}
        </Typography>
      </Container>
    </>
  );
};
