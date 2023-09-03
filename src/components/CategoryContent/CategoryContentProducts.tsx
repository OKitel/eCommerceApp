import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { searchProductProjections } from '../../slices/productProjections/slice';
import { ProgressLoader } from '../ProgressLoader/ProgressLoader';
import { ProductFilterMain } from './ProductFilterMain/ProductFilterMain';
import { CatalogProduct } from '../CatalogProduct/CatalogProduct';

import './styles.scss';

type Props = {
  categoryId: string;
};

export const CategoryContentProducts: React.FC<Props> = ({ categoryId }): JSX.Element => {
  const dispatch = useAppDispatch();
  const { productProjections, progress } = useAppSelector((state) => state.productProjections);

  useEffect(() => {
    dispatch(searchProductProjections({ filter: `categories.id:"${categoryId}"` }));
  }, [categoryId, dispatch]);

  const renderProductCards = (): React.ReactElement | React.ReactElement[] => {
    if (progress) {
      return <ProgressLoader />;
    }

    if (!productProjections || (productProjections && !productProjections.length)) {
      return <Typography variant="h5">No products found</Typography>;
    }

    return (
      <Box className="product-cards">
        {productProjections.map((productProjection) => (
          <CatalogProduct key={productProjection.id} productProjection={productProjection} />
        ))}
      </Box>
    );
  };

  return (
    <Box className="category-content-products">
      <ProductFilterMain categoryId={categoryId} />
      {renderProductCards()}
    </Box>
  );
};
