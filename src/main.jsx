import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import LoginProvider from './contexts/LoginProvider';
import { BrowserRouter } from 'react-router-dom';
import LoadingProvider from './contexts/LoadingProvider';
import { SubmittingProvider } from './contexts/SubmittingProvider/SubmittingProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <LoadingProvider>
          <SubmittingProvider>
            <App />
          </SubmittingProvider>
        </LoadingProvider>
      </LoginProvider>
    </BrowserRouter>
  </StrictMode>
);
