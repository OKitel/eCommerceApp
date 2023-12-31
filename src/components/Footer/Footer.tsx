import { Box, Toolbar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { LINKS } from '../consts';

import './styles.scss';

export const Footer: React.FC = (): JSX.Element => {
  return (
    <Box className="footer">
      <Toolbar className="toolbar">
        <div className="footer-menu">
          <div>
            <RouterLink to={LINKS.catalog} className="footer-catalog">
              Catalog
            </RouterLink>
          </div>
          <div>
            <RouterLink to={LINKS.about_us} className="footer-about">
              About us
            </RouterLink>
          </div>
        </div>
        <div className="footer-logo">
          <RouterLink to={LINKS.main} className="footer-logo">
            Maestro
            <span className="footer-year">2023</span>
          </RouterLink>
        </div>
      </Toolbar>
    </Box>
  );
};
