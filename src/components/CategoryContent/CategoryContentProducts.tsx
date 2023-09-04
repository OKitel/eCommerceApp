import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { searchProductProjections } from '../../slices/productProjections/slice';
import { getMainProductType } from '../../slices/productTypes/slice';
import { ProgressLoader } from '../ProgressLoader/ProgressLoader';
import { ProductFilterMain } from './ProductFilterMain/ProductFilterMain';
import { ProductSorting } from './ProductSorting/ProductSorting';
import { CatalogProduct } from '../CatalogProduct/CatalogProduct';
import { getFilterSearchQueryArg } from './ProductFilterMain/utils';
import { getSortingSearchQueryArg } from './ProductSorting/utils';
import { TFilterAttributes, TSortingParams } from './types';

import './styles.scss';

type Props = {
  categoryId: string;
};

export const CategoryContentProducts: React.FC<Props> = ({ categoryId }): JSX.Element => {
  const dispatch = useAppDispatch();
  const { currency } = useAppSelector((state) => state.settings);
  const {
    types: { main: mainProductType },
  } = useAppSelector((state) => state.productTypes);
  const { productProjections, progress } = useAppSelector((state) => state.productProjections);

  useEffect(() => {
    if (!mainProductType) {
      dispatch(getMainProductType());
    }
  }, [dispatch, mainProductType]);

  const [filter, setFilter] = useState<TFilterAttributes>({});
  const [sorting, setSorting] = useState<TSortingParams>({});

  const applyFilters = (filterAttributes: TFilterAttributes): void => {
    setFilter(filterAttributes);
  };

  const applySorting = (sortingParams: TSortingParams): void => {
    setSorting(sortingParams);
  };

  useEffect(() => {
    const filterQueryArgArray = getFilterSearchQueryArg(filter);
    const sortArg = getSortingSearchQueryArg(sorting);

    dispatch(
      searchProductProjections({
        filter: [`categories.id:"${categoryId}"`, ...filterQueryArgArray],
        sort: sortArg,
        priceCurrency: currency,
      }),
    );
  }, [categoryId, currency, dispatch, filter, sorting]);

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
      <Box className="content-products">
        <ProductSorting applySorting={applySorting} />
        {renderProductCards()}
      </Box>
    </Box>
  );
};
