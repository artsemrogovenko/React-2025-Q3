import { ErrorBoundary } from '../components/ErrorBoundary.tsx';
import { Provider } from 'react-redux';
import { store } from '../store/store.ts';
import App from '../App.tsx';

export const AppWrapper = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>
);
