import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { Category } from '@commercetools/platform-sdk';

import { useAppSelector } from '../../store/hooks';
import { LINKS } from '../consts';

import './styles.scss';

type Props = {
  category: Category;
  active?: boolean;
};

export const CatalogCategoryCard: React.FC<Props> = ({ category, active }): JSX.Element => {
  const navigate = useNavigate();
  const { localization } = useAppSelector((state) => state.settings);
  const categoryUrl = `${LINKS.catalog}/${category.slug[localization]}`;

  const showSaleRibbon = useMemo(() => {
    const discountedCategories = ['Digital Pianos', 'Bass guitars', 'Saxophones', 'Drums'];
    return discountedCategories.includes(category.name[localization]);
  }, [category, localization]);

  const handleClickCategory = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault();
    navigate(categoryUrl);
  };

  const className = classNames('catalog-category-card', { 'catalog-category-card_active': active });

  return (
    <Card className={className}>
      <CardActionArea
        disabled={active}
        className="catalog-category__button"
        href={categoryUrl}
        onClick={handleClickCategory}
      >
        {showSaleRibbon && <div className="sale-ribbon">Sale</div>}
        <CardContent className="catalog-category__content" sx={{ paddingBlock: 1, paddingInline: 3.5 }}>
          <Typography>{category.name[localization]}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
