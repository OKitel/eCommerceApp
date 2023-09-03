import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { Category } from '@commercetools/platform-sdk';

import { useAppSelector } from '../../store/hooks';
import { LINKS } from '../consts';

import './styles.scss';

type CatalogCategoryProps = {
  category: Category;
};

export const CatalogCategory: React.FC<CatalogCategoryProps> = ({ category }): JSX.Element => {
  const navigate = useNavigate();
  const { localization } = useAppSelector((state) => state.settings);
  const categoryUrl = `${LINKS.catalog}/${category.slug[localization]}`;

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