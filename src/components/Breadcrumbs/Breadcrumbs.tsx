import { emphasize, styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';

import { useAppSelector } from '../../store/hooks';
import { createBreadcrumbs } from './utils';

import './styles.scss';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light' ? theme.palette.secondary.contrastText : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(4),
    color: theme.palette.text.primary,
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
    boxShadow: theme.shadows[1],
  };
}) as typeof Chip; // need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

export const ChipBreadcrumbs = (): JSX.Element => {
  const { localization } = useAppSelector((state) => state.settings);
  const { categories } = useAppSelector((state) => state.categories);
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbs = createBreadcrumbs(pathnames, localization, categories || []);
  const activeBreadcrumb = breadcrumbs.pop();

  const handleClickBreadcrumb = (event: React.MouseEvent<Element, MouseEvent>): void => {
    event.preventDefault();

    const link = event.currentTarget.getAttribute('href');

    if (link) {
      navigate(link);
    }
  };

  return (
    <div role="presentation">
      <Breadcrumbs className="breadcrumbs" aria-label="breadcrumb">
        <StyledBreadcrumb
          component="a"
          href="/"
          label="Home"
          icon={<HomeIcon fontSize="small" />}
          onClick={handleClickBreadcrumb}
        />
        {breadcrumbs.map((breadcrumb) => {
          return (
            <StyledBreadcrumb
              key={breadcrumb.link}
              component="a"
              href={breadcrumb.link}
              label={breadcrumb.label}
              onClick={handleClickBreadcrumb}
            />
          );
        })}
        <Chip component="div" label={activeBreadcrumb?.label} sx={{ fontSize: 'inherit' }} />
      </Breadcrumbs>
    </div>
  );
};
