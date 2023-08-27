import * as React from 'react';
import Link from '@mui/material/Link';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Box, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { LINKS } from '../consts';

import '../Header/styles.scss';
import './styles.scss';

export const Footer: React.FC = (): JSX.Element => {
  return (
    <Box className="footer">
      <Toolbar className="toolbar">
        <div className="social-links">
          <Link href="https://facebook.com" color="inherit">
            <FacebookRoundedIcon />
          </Link>
          <Link href="https://twitter.com" color="inherit">
            <TwitterIcon />
          </Link>
          <Link href="https://youtube.com" color="inherit">
            <YouTubeIcon />
          </Link>
          <Link href="https://instagram.com" color="inherit">
            <InstagramIcon />
          </Link>
        </div>
        <div className="year">
          <Typography sx={{ fontWeight: 600 }}>2023</Typography>
        </div>
        <div className="logo">
          <RouterLink to={LINKS.main} className="logo-main">
            Maestro
            <span className="logo-sub">Market</span>
          </RouterLink>
        </div>
      </Toolbar>
    </Box>
  );
};
