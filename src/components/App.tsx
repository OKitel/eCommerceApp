import { Routes, Route } from 'react-router-dom';
import { NotFound } from '../pages/NotFound/NotFound';

export const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Main Page</h1>}></Route>
        <Route path="/login" element={<h1>Login Page</h1>}></Route>
        <Route path="/registration" element={<h1>Registration Page</h1>}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};
