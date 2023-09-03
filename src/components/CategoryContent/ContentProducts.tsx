import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { searchProductProjections } from '../../slices/productProjections/slice';
import { getMainProductType } from '../../slices/productTypes/slice';
import { ProgressLoader } from '../ProgressLoader/ProgressLoader';
import { CatalogProduct } from '../CatalogProduct/CatalogProduct';

import './styles.scss';

type Props = {
  categoryId: string;
};

export const ContentProducts: React.FC<Props> = ({ categoryId }): JSX.Element => {
  const dispatch = useAppDispatch();

  const { productProjections, progress } = useAppSelector((state) => state.productProjections);
  const { main: mainProductType } = useAppSelector((state) => state.productTypes.types);

  useEffect(() => {
    dispatch(searchProductProjections({ filter: `categories.id:"${categoryId}"` }));
  }, [categoryId, dispatch]);

  useEffect(() => {
    if (!mainProductType) {
      dispatch(getMainProductType());
    }
  }, [dispatch, mainProductType]);

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
