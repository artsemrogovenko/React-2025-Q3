import { StrictMode } from 'react';
import { type Container, createRoot } from 'react-dom/client';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { AppProvider } from './AppContext.tsx';
import { BrowserRouter } from 'react-router';
import { AppRoutes } from './routes/AppRoutes.tsx';

const rootElement = document.getElementById('root') as Container;
createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
