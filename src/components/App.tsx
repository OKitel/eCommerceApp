import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useAppDispatch } from '../store/hooks';
import { initSettings } from '../slices/settings/slice';
import { getLoggedInCustomer } from '../slices/customer/slice';

import { AlertsSnackbar } from './AlertsSnackbar/AlertsSnackbar';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';

import { NotFound } from '../pages/NotFound/NotFound';
import { Main } from '../pages/Main/Main';
import { Catalog } from '../pages/Catalog/Catalog';
import { Category } from '../pages/Catalog/Category/Category';
import { Cart } from '../pages/Cart/Cart';
import { Login } from '../pages/Login/Login';
import { Registration } from '../pages/Registration/Registration';
import { Profile } from '../pages/Profile/Profile';

import { LINKS, URL_PARAMS } from './consts';
import { Product } from '../pages/Catalog/Category/Product/Product';

export const App: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initSettings());
    dispatch(getLoggedInCustomer());
  }, [dispatch]);

  return (
    <>
      <AlertsSnackbar />
      <Header />
      <Routes>
        <Route path={LINKS.main} element={<Main />}></Route>
        <Route path={LINKS.login} element={<Login />}></Route>
        <Route path={LINKS.registration} element={<Registration />}></Route>
        <Route path={LINKS.cart} element={<Cart />}></Route>
        <Route path={LINKS.catalog}>
          <Route index element={<Catalog />}></Route>
          <Route path={`:${URL_PARAMS.categorySlug}`}>
            <Route index element={<Category />}></Route>
          </Route>
        </Route>
        <Route path={LINKS.product}>
          <Route path={`:${URL_PARAMS.productId}`}>
            <Route index element={<Product />}></Route>
            <Route path={`:${URL_PARAMS.productSlug}`} element={<Product />}></Route>
          </Route>
        </Route>
        <Route path={LINKS.profile} element={<Profile />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </>
  );
};
