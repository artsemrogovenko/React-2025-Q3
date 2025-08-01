import { StrictMode } from 'react';
import { type Container, createRoot } from 'react-dom/client';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { AppProvider } from './AppContext.tsx';
import { BrowserRouter } from 'react-router';
import { AppRoutes } from './routes/AppRoutes.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const rootElement = document.getElementById('root') as Container;
createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AppProvider>
          <Provider store={store}>
            <AppRoutes />
          </Provider>
        </AppProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
