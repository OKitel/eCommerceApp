import * as React from 'react';
import Hidden from '@mui/material/Hidden';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearCustomerData } from '../../slices/customer/slice';
import { LINKS } from '../consts';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import './styles.scss';
import { Stack } from '@mui/material';

export const Header: React.FC = (): JSX.Element => {
  const customerData = useAppSelector((state) => state.customer.customerData);
  const progressIntrospect = useAppSelector((state) => state.customer.progress.introspect);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClickCart = (): void => navigate(LINKS.cart);
  const handleClickAvatar = (): void => navigate(LINKS.profile);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="toolbar">
          <div className="logo">
            <RouterLink to={'/'} className="logo-main">
              Maestro
              <span className="logo-sub">Market</span>
            </RouterLink>
          </div>
          <Button component={RouterLink} to={LINKS.catalog} color="secondary" variant="contained">
            Catalog
          </Button>
          <Hidden smDown>
            <div>
              <Stack direction="row" spacing={1}>
                <IconButton size="medium" color="inherit" onClick={handleClickCart}>
                  <ShoppingCartRoundedIcon />
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
              </Stack>
            </div>
          </Hidden>
          <BurgerMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
