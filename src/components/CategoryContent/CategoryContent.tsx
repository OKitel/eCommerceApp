import { useEffect } from 'react';
import { Box } from '@mui/material';
import { Category } from '@commercetools/platform-sdk';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { searchProductProjections } from '../../slices/productProjections/slice';
import { ProgressLoader } from '../ProgressLoader/ProgressLoader';
import { CatalogCategory } from '../CatalogCategory/CatalogCategory';
import { CatalogProduct } from '../CatalogProduct/CatalogProduct';

import './styles.scss';

type CategoryContentProps = {
  category: Category;
};

export const CategoryContent: React.FC<CategoryContentProps> = ({ category }): JSX.Element | JSX.Element[] => {
  const dispatch = useAppDispatch();

  const { categories } = useAppSelector((state) => state.categories);
  const { productProjections, progress: progressProductProjections } = useAppSelector(
    (state) => state.productProjections,
  );

  const subcategories = categories?.filter((subcategory) => subcategory.parent?.id === category.id);
  const isSubcategory = category && !subcategories?.length;

  useEffect(() => {
    if (isSubcategory) {
      dispatch(searchProductProjections({ filter: `categories.id:"${category.id}"` }));
    }
  }, [category, dispatch, isSubcategory]);

  if (isSubcategory) {
    if (progressProductProjections) {
      return <ProgressLoader />;
    }

    if (!productProjections) {
      return <div>No content</div>;
    }

    return (
      <Box className="category-content">
        {productProjections.map((productProjection) => (
          <CatalogProduct key={productProjection.id} product={productProjection} />
        ))}
      </Box>
    );
  }

  if (subcategories) {
    return (
      <Box className="category-content">
        {subcategories.map((subcategory) => (
          <CatalogCategory key={subcategory.id} category={subcategory} />
        ))}
      </Box>
    );
  }

  return <div>No content</div>;
};
