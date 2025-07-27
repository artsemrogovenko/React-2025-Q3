import { ErrorBoundary } from '../../components/ErrorBoundary';
import { BrowserRouter } from 'react-router';
import { AppProvider } from '../../AppContext';
import type { ReactNode } from 'react';

export const Wrapper = ({ children }: { children: ReactNode }) => (
  <ErrorBoundary>
    <BrowserRouter>
      <AppProvider>{children}</AppProvider>
    </BrowserRouter>
  </ErrorBoundary>
);
