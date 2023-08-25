import * as React from 'react';
import { useState } from 'react';
import Hidden from '@mui/material/Hidden';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearCustomerData } from '../../slices/customer/slice';
import { LINKS } from '../consts';
import './styles.scss';

export const Header: React.FC = (): JSX.Element => {
  const customerData = useAppSelector((state) => state.customer.customerData);
  const progressIntrospect = useAppSelector((state) => state.customer.progress.introspect);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClickCart = (): void => navigate(LINKS.cart);
  const [open, setOpen] = useState(false);

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
          <Hidden smDown>
            <div>
              <IconButton size="medium" color="inherit" onClick={handleClickCart}>
                <ShoppingCartRoundedIcon />
              </IconButton>
              {progressIntrospect ? null : customerData ? (
                <Button
                  component={RouterLink}
                  to="/"
                  variant="contained"
                  color="secondary"
                  onClick={(): void => {
                    dispatch(clearCustomerData());
                  }}
                >
                  Logout
                </Button>
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
            </div>
          </Hidden>
          <Hidden smUp>
            <IconButton onClick={(): void => setOpen(true)} color="secondary">
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
        <SwipeableDrawer
          anchor="right"
          open={open}
          onOpen={(): void => setOpen(true)}
          onClose={(): void => setOpen(false)}
        >
          <div onClick={(): void => setOpen(false)} onKeyUp={(): void => setOpen(false)} role="button" tabIndex={0}>
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
          </div>
          <Divider />
          <IconButton
            size="medium"
            color="inherit"
            onClick={(): void => {
              handleClickCart();
              setOpen(false);
            }}
          >
            <ShoppingCartRoundedIcon />
          </IconButton>
          {progressIntrospect ? null : customerData ? (
            <Button
              component={RouterLink}
              to="/"
              variant="contained"
              color="secondary"
              onClick={(): void => {
                dispatch(clearCustomerData());
                setOpen(false);
              }}
              sx={{
                width: 180,
                ml: 1,
                mr: 1,
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                component={RouterLink}
                to={LINKS.login}
                variant="contained"
                sx={{ m: 1, width: 180, ml: 1, mr: 1 }}
                color="secondary"
                onClick={(): void => {
                  setOpen(false);
                }}
              >
                Login
              </Button>
              <Button
                component={RouterLink}
                to={LINKS.registration}
                color="secondary"
                variant="contained"
                sx={{
                  width: 180,
                  ml: 1,
                  mr: 1,
                }}
                onClick={(): void => {
                  setOpen(false);
                }}
              >
                Register
              </Button>
            </>
          )}
        </SwipeableDrawer>
      </AppBar>
    </Box>
  );
};
