import { Route, Routes } from 'react-router';
import { NotFound } from '../pages/NotFound';
import App from '../App';
import { About } from '../pages/About';
import { APP_ROUTES } from '../constants';
import { DetailsHandler } from '../details/DetailsHandler';
import { Home } from '../Home';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<App />}>
        <Route index element={<Home />} />
        <Route path={APP_ROUTES.about} element={<About />} />
        <Route path={APP_ROUTES.home} element={<Home />}>
          <Route path={APP_ROUTES.details} element={<DetailsHandler />} />
          <Route
            path={`${APP_ROUTES.page}/${APP_ROUTES.details}`}
            element={<DetailsHandler />}
          />
        </Route>

        <Route path={APP_ROUTES.notFound} element={<NotFound />} />
      </Route>
    </Routes>
  );
}
