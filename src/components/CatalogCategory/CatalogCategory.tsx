import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { Category } from '@commercetools/platform-sdk';

import { useAppSelector } from '../../store/hooks';
import './styles.scss';
import { useLocation, useNavigate } from 'react-router-dom';

type CatalogCategoryProps = {
  category: Category;
};

export const CatalogCategory: React.FC<CatalogCategoryProps> = ({ category }): JSX.Element => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { localization } = useAppSelector((state) => state.settings);
  const categoryUrl = `${pathname}/${category.slug[localization]}`;

  const handleClickCategory = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault();
    navigate(categoryUrl);
  };

  return (
    <Card className="catalog-category">
      <CardActionArea className="catalog-category__button" href={categoryUrl} onClick={handleClickCategory}>
        <CardContent className="catalog-category__content">
          <Typography variant="h4" component="div">
            {category.name[localization]}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
