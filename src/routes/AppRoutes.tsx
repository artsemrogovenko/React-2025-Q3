import { Route, Routes } from 'react-router';
import { NotFound } from '../pages/NotFound';
import App from '../App';
import { About } from '../pages/About';
import { APP_ROUTES } from '../constants';

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<App />} />
      <Route path={APP_ROUTES.home} element={<App />} />

      <Route path={APP_ROUTES.about} element={<About />} />

      <Route path={APP_ROUTES.notFound} element={<NotFound />} />
    </Routes>
  );
}
