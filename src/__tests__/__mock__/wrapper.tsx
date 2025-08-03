import { ErrorBoundary } from '../../components/ErrorBoundary';
import { BrowserRouter } from 'react-router';
import { AppProvider } from '../../AppContext';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { AppRoutes } from '../../routes/AppRoutes';

export const Wrapper = ({ children }: { children: ReactNode }) => (
  <ErrorBoundary>
    <BrowserRouter>
      <Provider store={store}>
        <AppProvider>{children}</AppProvider>
      </Provider>
    </BrowserRouter>
  </ErrorBoundary>
);

export const AppWrapper = ({ basename = '' }: { basename?: string }) => (
  <ErrorBoundary>
    <BrowserRouter basename={basename}>
      <AppProvider>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </AppProvider>
    </BrowserRouter>
  </ErrorBoundary>
);
