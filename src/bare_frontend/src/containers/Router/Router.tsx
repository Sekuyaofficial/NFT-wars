import { Navigate, Route, Routes } from 'react-router';

import { Arena, Home } from '../../pages';

import { routes } from './routes';

export const Router = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path={routes.home.root} element={<Home />} />
      <Route path={routes.arena.root} element={<Arena />} />
    </Routes>
  );
};
