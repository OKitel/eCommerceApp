import { Category } from '@commercetools/platform-sdk';

import { PAGE_PARAMS } from '../consts';
import { TBreadcrumb } from './types';
import { Localizations } from '../../types';

function getPageBreadcrumb(pageSlug: string): TBreadcrumb {
  const breadcrumb: TBreadcrumb = { link: `/${pageSlug}`, label: pageSlug };
  const pageFound = PAGE_PARAMS.find((page) => page.slug === pageSlug);

  if (pageFound) {
    breadcrumb.label = pageFound.name;
  }

  return breadcrumb;
}

function getCategoryBreadcrumbs(
  pageSlug: string,
  categorySlug: string,
  localization: Localizations,
  categories: Category[],
): TBreadcrumb[] {
  const categoryBreadcrumbs: TBreadcrumb[] = [];

  const currentCategoryBreadcrumb: TBreadcrumb = { link: `/${pageSlug}/${categorySlug}`, label: categorySlug };
  const categoryFound = categories.find((category) => category.slug[localization] === categorySlug);

  if (categoryFound) {
    currentCategoryBreadcrumb.label = categoryFound.name[localization];

    if (categoryFound.parent) {
      const parentCategoryId = categoryFound.parent.id;
      const parentCategoryFound = categories.find((category) => category.id === parentCategoryId);

      if (parentCategoryFound) {
        const parentCategoryBreadcrumb: TBreadcrumb = {
          link: `/${pageSlug}/${parentCategoryFound.slug[localization]}`,
          label: parentCategoryFound.name[localization],
        };

        categoryBreadcrumbs.push(parentCategoryBreadcrumb);
      }
    }
  }

  categoryBreadcrumbs.push(currentCategoryBreadcrumb);

  return categoryBreadcrumbs;
}

export function createBreadcrumbs(
  pathnames: string[],
  localization: Localizations,
  categories: Category[],
): TBreadcrumb[] {
  const breadcrumbs: TBreadcrumb[] = [];

  if (pathnames[0]) {
    const pageBreadCrumb = getPageBreadcrumb(pathnames[0]);

    breadcrumbs.push(pageBreadCrumb);
  }

  if (pathnames[1]) {
    const categoryBreadcrumbs = getCategoryBreadcrumbs(pathnames[0], pathnames[1], localization, categories);

    breadcrumbs.push(...categoryBreadcrumbs);
  }

  return breadcrumbs;
}
