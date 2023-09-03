import { Box } from '@mui/material';
import { Category } from '@commercetools/platform-sdk';

import { useAppSelector } from '../../store/hooks';
import { CatalogCategory } from '../CatalogCategory/CatalogCategory';
import { CategoryContentProducts } from './CategoryContentProducts';

import './styles.scss';

type CategoryContentProps = {
  category: Category;
};

export const CategoryContent: React.FC<CategoryContentProps> = ({ category }): JSX.Element => {
  const { categories } = useAppSelector((state) => state.categories);

  const subcategories = categories?.filter((subcategory) => subcategory.parent?.id === category.id);
  const isSubcategory = category && !subcategories?.length;

  if (isSubcategory) {
    return <CategoryContentProducts categoryId={category.id} />;
  }

  if (subcategories) {
    return (
      <Box className="category-cards">
        {subcategories.map((subcategory) => (
          <CatalogCategory key={subcategory.id} category={subcategory} />
        ))}
      </Box>
    );
  }

  return <div>No content</div>;
};
