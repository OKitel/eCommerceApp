import { Routes, Route } from 'react-router-dom';
import { NotFound } from '../pages/NotFound/NotFound';
import { Header } from './Header/Header';
import { Registration } from '../pages/Registration/Registration';
import { Login } from '../pages/Login/Login';

export const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<h1>Main Page</h1>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};
