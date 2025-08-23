import { StrictMode } from 'react';
import { type Container, createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const rootElement = document.getElementById('root') as Container;
createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
