import { Error } from '../../app/[@slug]/error.tsx';
import { BrowserRouter } from 'react-router';
import { AppProvider } from '../../AppContext';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { AppRoutes } from '../../routes/AppRoutes';

export const Wrapper = ({ children }: { children: ReactNode }) => (
  <Error>
    <BrowserRouter>
      <Provider store={store}>
        <AppProvider>{children}</AppProvider>
      </Provider>
    </BrowserRouter>
  </Error>
);

export const AppWrapper = ({ basename = '' }: { basename?: string }) => (
  <Error>
    <BrowserRouter basename={basename}>
      <AppProvider>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </AppProvider>
    </BrowserRouter>
  </Error>
);
