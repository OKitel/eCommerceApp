import { useCallback, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { searchProductProjections } from '../../slices/productProjections/slice';
import { getMainProductType } from '../../slices/productTypes/slice';
import { ProgressLoader } from '../ProgressLoader/ProgressLoader';
import { ProductFilterMain } from './ProductFilterMain/ProductFilterMain';
import { ProductSorting } from './ProductSorting/ProductSorting';
import { CatalogProduct } from '../CatalogProduct/CatalogProduct';
import { ProductPagination } from './ProductPagination/ProductPagination';
import { getFilterSearchQueryArg } from './ProductFilterMain/utils';
import { getSortingSearchQueryArg } from './ProductSorting/utils';
import { getOffset } from './ProductPagination/utils';
import { LIST_PAGE_LIMIT_DEFAULT } from '../../consts';
import { TFilterAttributes, TSortingParams } from './types';

import './styles.scss';

type Props = {
  categoryId?: string;
  textSearch?: string;
};

export const ProductList: React.FC<Props> = ({ categoryId, textSearch }): JSX.Element => {
  const dispatch = useAppDispatch();
  const { currency, localization } = useAppSelector((state) => state.settings);
  const {
    types: { main: mainProductType },
  } = useAppSelector((state) => state.productTypes);
  const { productProjections, pageInfo, progress } = useAppSelector((state) => state.productProjections);
  const pageLimit = pageInfo ? pageInfo.limit : LIST_PAGE_LIMIT_DEFAULT;

  const [filterAttributes, setFilterAttributes] = useState<TFilterAttributes>({});
  const [sortingParams, setSortingParams] = useState<TSortingParams>({});

  const searchProducts = useCallback(
    (pageNumber?: number): void => {
      const filter = getFilterSearchQueryArg(filterAttributes, categoryId);
      const sort = getSortingSearchQueryArg(sortingParams);
      const offset = pageNumber ? getOffset(pageNumber, pageLimit) : undefined;

      dispatch(
        searchProductProjections({
          filter,
          sort,
          offset,
          limit: pageLimit,
          priceCurrency: currency,
          [`text.${localization}`]: textSearch,
        }),
      );
    },
    [categoryId, currency, dispatch, filterAttributes, localization, pageLimit, sortingParams, textSearch],
  );

  useEffect(() => {
    if (!mainProductType) {
      dispatch(getMainProductType());
    }
  }, [dispatch, mainProductType]);

  useEffect(() => {
    searchProducts();
  }, [searchProducts]);

  const applyFilters = (attributes: TFilterAttributes): void => {
    setFilterAttributes(attributes);
  };

  const applySorting = (params: TSortingParams): void => {
    setSortingParams(params);
  };

  const changePage = (pageNumber: number): void => {
    searchProducts(pageNumber);
  };

  const renderProductCountInfo = (): React.ReactElement | null => {
    if (progress || !pageInfo || (pageInfo && !pageInfo.total)) {
      return null;
    }

    const { count, offset, total } = pageInfo;
    const firstProductNumber = offset + 1;
    const lastProductNumber = offset + count;

    return <Typography variant="h5">{`Products ${firstProductNumber}-${lastProductNumber} of ${total}`}</Typography>;
  };

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
    <Box className="product-list">
      <ProductFilterMain applyFilters={applyFilters} />
      <Box className="content-products">
        <ProductSorting applySorting={applySorting} />
        {renderProductCountInfo()}
        {renderProductCards()}
        <ProductPagination changePage={changePage} />
      </Box>
    </Box>
  );
};
