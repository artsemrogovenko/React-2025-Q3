import { Route, Routes } from 'react-router';
import { NotFound } from '../pages/NotFound';
import App from '../App';
import { About } from '../pages/About';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route index element={<App />} action />

      <Route path="about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
