import { useEffect } from 'react';
import { Box } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { searchProductProjections } from '../../slices/productProjections/slice';
import { ProgressLoader } from '../ProgressLoader/ProgressLoader';
import { CatalogProduct } from '../CatalogProduct/CatalogProduct';

import './styles.scss';

type Props = {
  categoryId: string;
};

export const ContentProducts: React.FC<Props> = ({ categoryId }): JSX.Element | JSX.Element[] => {
  const dispatch = useAppDispatch();

  const { productProjections, progress } = useAppSelector((state) => state.productProjections);

  useEffect(() => {
    dispatch(searchProductProjections({ filter: `categories.id:"${categoryId}"` }));
  }, [categoryId, dispatch]);

  if (progress) {
    return <ProgressLoader />;
  }

  if (!productProjections) {
    return <div>No products</div>;
  }

  return (
    <Box className="category-content">
      {productProjections.map((productProjection) => (
        <CatalogProduct key={productProjection.id} productProjection={productProjection} />
      ))}
    </Box>
  );
};
