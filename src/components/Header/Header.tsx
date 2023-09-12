import React from 'react';
import Hidden from '@mui/material/Hidden';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { Badge, Stack } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearCustomerData } from '../../slices/customer/slice';
import { clearCart } from '../../slices/cart/slice';
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
  const numberOfCartLineItems = activeCart?.lineItems.length;

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
            <Hidden smDown>
              <Button component={RouterLink} to={LINKS.catalog} color="secondary" variant="contained" sx={{ mr: 1 }}>
                Catalog
              </Button>
            </Hidden>
            <SearchBar
              setSearchQuery={(query: string): void => navigate(`${LINKS.search}?${SEARCH_QUERY_PARAM}=${query}`)}
            />
          </div>
          <Hidden smDown>
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
                    <Button
                      component={RouterLink}
                      to={LINKS.main}
                      variant="contained"
                      color="secondary"
                      onClick={(): void => {
                        dispatch(clearCustomerData());
                        dispatch(clearCart());
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
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
