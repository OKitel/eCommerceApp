import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { searchProductProjections } from '../../slices/productProjections/slice';
import { ProgressLoader } from '../ProgressLoader/ProgressLoader';
import { ProductFilterMain } from './ProductFilterMain/ProductFilterMain';
import { CatalogProduct } from '../CatalogProduct/CatalogProduct';
import { getFilterSearchQueryArg } from './ProductFilterMain/utils';
import { TFilterAttributes } from './types';

import './styles.scss';

type Props = {
  categoryId: string;
};

export const CategoryContentProducts: React.FC<Props> = ({ categoryId }): JSX.Element => {
  const dispatch = useAppDispatch();
  const { currency } = useAppSelector((state) => state.settings);
  const { productProjections, progress } = useAppSelector((state) => state.productProjections);

  const [filter, setFilter] = useState<TFilterAttributes>({});

  const applyFilters = (filterAttributes: TFilterAttributes): void => {
    setFilter(filterAttributes);
  };

  useEffect(() => {
    const filterQueryArgArray = getFilterSearchQueryArg(filter);

    dispatch(
      searchProductProjections({
        filter: [`categories.id:"${categoryId}"`, ...filterQueryArgArray],
        priceCurrency: currency,
      }),
    );
  }, [categoryId, currency, dispatch, filter]);

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
      <ProductFilterMain applyFilters={applyFilters} />
      {renderProductCards()}
    </Box>
  );
};
