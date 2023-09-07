import { Box, Typography } from '@mui/material';
import { Category } from '@commercetools/platform-sdk';

import { useAppSelector } from '../../store/hooks';
import { CatalogCategoryCard } from '../CatalogCategoryCard/CatalogCategoryCard';
import { ProductList } from '../ProductList/ProductList';

type CategoryContentProps = {
  category: Category;
};

export const CategoryContent: React.FC<CategoryContentProps> = ({ category }): JSX.Element => {
  const { categories } = useAppSelector((state) => state.categories);

  const subcategories = categories?.filter((subcategory) => subcategory.parent?.id === category.id);
  const isRootCategory = category && !!subcategories?.length;

  const renderSubcategoryCards = (): React.ReactElement => {
    if (isRootCategory) {
      return (
        subcategories && (
          <Box className="category-cards">
            {subcategories.map((subcategory) => (
              <CatalogCategoryCard key={subcategory.id} category={subcategory} />
            ))}
          </Box>
        )
      );
    }

    const rootCategoryId = category.parent?.id;
    const siblingSubcategories = rootCategoryId
      ? categories?.filter((subcategory) => subcategory.parent?.id === rootCategoryId)
      : [];

    return (
      <Box className="category-cards">
        {siblingSubcategories &&
          siblingSubcategories.map((subcategory) => (
            <CatalogCategoryCard active={subcategory.id === category.id} key={subcategory.id} category={subcategory} />
          ))}
      </Box>
    );
  };

  return (
    <>
      <Typography variant="h5">Subcategories</Typography>
      {renderSubcategoryCards()}
      <ProductList categoryId={category.id} subtree={isRootCategory} />
    </>
  );
};
