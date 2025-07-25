import { StrictMode } from 'react';
import { createRoot, type Container } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { AppProvider } from './AppContext.tsx';

const rootElement = document.getElementById('root') as Container;
createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <AppProvider>
        <App />
      </AppProvider>
    </ErrorBoundary>
  </StrictMode>
);
