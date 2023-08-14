import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import IconButton from '@mui/material/IconButton';
import './styles.scss';

// eslint-disable-next-line max-lines-per-function
export const Header: React.FC = (): JSX.Element => {
  const [isAuth, setIsAuth] = React.useState(true);
  const navigate = useNavigate();
  const handleCart = (): void => navigate('/cart');
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <RouterLink to={'/'} className="logo">
            Maestro
            <span className="logo-sub">Market</span>
          </RouterLink>
          <IconButton size="medium" color="inherit" onClick={handleCart}>
            <ShoppingCartRoundedIcon />
          </IconButton>
          {!isAuth && (
            <>
              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                sx={{ m: 1 }}
                onClick={(): void => setIsAuth(true)}
              >
                Login
              </Button>
              <Button component={RouterLink} to="/registration" variant="contained">
                Register
              </Button>
            </>
          )}
          {isAuth && (
            <Button
              component={RouterLink}
              to="/"
              variant="contained"
              color="secondary"
              onClick={(): void => setIsAuth(false)}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
