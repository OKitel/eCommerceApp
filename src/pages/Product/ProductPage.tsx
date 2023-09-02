import { Product } from '@commercetools/platform-sdk';
import { Box, Container, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { URL_PARAMS } from '../../components/consts';
import { getProduct } from '../../slices/product/slice';
import { ChipBreadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

export const ProductPage: React.FC = (): React.ReactElement => {
  const { [URL_PARAMS.productId]: productId } = useParams();
  const dispatch = useAppDispatch();
  const maybeProduct: Product | null = useAppSelector((state) => state.product.product);

  useEffect(() => {
    if (productId && !maybeProduct) {
      dispatch(getProduct(productId));
    }
  }, [dispatch, maybeProduct, productId]);

  if (!productId) {
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
      </Container>
    </>
  );
};
