import { Box } from '@mui/material';
import { Category } from '@commercetools/platform-sdk';

import { useAppSelector } from '../../store/hooks';
import { CatalogCategory } from '../CatalogCategory/CatalogCategory';
import { ContentProducts } from './ContentProducts';

import './styles.scss';

type CategoryContentProps = {
  category: Category;
};

export const CategoryContent: React.FC<CategoryContentProps> = ({ category }): JSX.Element => {
  const { categories } = useAppSelector((state) => state.categories);

  const subcategories = categories?.filter((subcategory) => subcategory.parent?.id === category.id);
  const isSubcategory = category && !subcategories?.length;

  if (isSubcategory) {
    return <ContentProducts categoryId={category.id} />;
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
