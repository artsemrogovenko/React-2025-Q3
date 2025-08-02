import { ErrorBoundary } from '../../components/ErrorBoundary';
import { BrowserRouter } from 'react-router';
import { AppProvider } from '../../AppContext';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

export const Wrapper = ({ children }: { children: ReactNode }) => (
  <ErrorBoundary>
    <BrowserRouter>
      <Provider store={store}>
        <AppProvider>{children}</AppProvider>
      </Provider>
    </BrowserRouter>
  </ErrorBoundary>
);
