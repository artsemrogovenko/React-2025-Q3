'use client';
import { StrictMode } from 'react';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { AppProvider } from './AppContext.tsx';
import { BrowserRouter } from 'react-router';
import { AppRoutes } from './routes/AppRoutes.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

export function RootElement() {
  return (
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
}
