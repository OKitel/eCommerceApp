import React from 'react';
import Hidden from '@mui/material/Hidden';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { Badge, Stack, Tooltip } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearCustomerData } from '../../slices/customer/slice';
import { clearActiveCart } from '../../slices/cart/slice';
import { LINKS } from '../consts';
import { SEARCH_QUERY_PARAM } from '../../consts';

import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { SearchBar } from '../SearchBar/SearchBar';
import { CurrencySelector } from './CurrencySelector';

import './styles.scss';

export const Header: React.FC = (): JSX.Element => {
  const customerData = useAppSelector((state) => state.customer.customerData);
  const progressIntrospect = useAppSelector((state) => state.customer.progress.introspect);
  const { activeCart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClickCart = (): void => navigate(LINKS.cart);
  const handleClickAvatar = (): void => navigate(LINKS.profile);
  const handleClickTeam = (): void => navigate(LINKS.about_us);
  const numberOfCartLineItems = activeCart?.totalLineItemQuantity;

  return (
    <Box className="header" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="toolbar">
          <div className="logo">
            <RouterLink to={'/'} className="logo-main">
              Maestro
              <span className="logo-sub">Market</span>
            </RouterLink>
          </div>

          <div className="search-wrapper">
            <Hidden mdDown>
              <Button component={RouterLink} to={LINKS.catalog} color="secondary" variant="contained" sx={{ mr: 1 }}>
                Catalog
              </Button>
            </Hidden>
            <SearchBar
              setSearchQuery={(query: string): void => navigate(`${LINKS.search}?${SEARCH_QUERY_PARAM}=${query}`)}
            />
          </div>
          <Hidden mdDown>
            <div>
              <Stack direction="row" spacing={1}>
                <IconButton size="medium" color="inherit" aria-label="cart" onClick={handleClickCart}>
                  <Badge badgeContent={numberOfCartLineItems} color="secondary" data-testid="cart-icon-badge">
                    <ShoppingCartRoundedIcon />
                  </Badge>
                </IconButton>
                {progressIntrospect ? null : customerData ? (
                  <>
                    <IconButton color="inherit" onClick={handleClickAvatar}>
                      <AccountCircleIcon />
                    </IconButton>
                    <Tooltip title="About us">
                      <IconButton size="medium" color="inherit" aria-label="cart" onClick={handleClickTeam}>
                        <InfoRoundedIcon />
                      </IconButton>
                    </Tooltip>
                    <Button
                      component={RouterLink}
                      to={LINKS.main}
                      variant="contained"
                      color="secondary"
                      onClick={(): void => {
                        dispatch(clearCustomerData());
                        dispatch(clearActiveCart());
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Tooltip title="About us">
                      <IconButton size="medium" color="inherit" aria-label="cart" onClick={handleClickTeam}>
                        <InfoRoundedIcon />
                      </IconButton>
                    </Tooltip>
                    <Button component={RouterLink} to={LINKS.login} variant="contained" sx={{ m: 1 }} color="secondary">
                      Login
                    </Button>
                    <Button component={RouterLink} to={LINKS.registration} color="secondary" variant="contained">
                      Register
                    </Button>
                  </>
                )}
                <CurrencySelector />
              </Stack>
            </div>
          </Hidden>
          <BurgerMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
