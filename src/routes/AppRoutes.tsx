import { Route, Routes } from 'react-router';
import { NotFound } from '../pages/NotFound';
import App from '../App';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route index element={<App />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
