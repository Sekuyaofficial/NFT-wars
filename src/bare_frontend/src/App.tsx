import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Layout, Router } from './containers';
import { StoreProvider } from './hooks';

import 'react-toastify/dist/ReactToastify.css';
import './assets/main-styles/index.scss';

export const App = () => (
  <StoreProvider>
    <BrowserRouter>
      <Suspense fallback={null}>
        <ToastContainer />
        <Layout>
          <Router />
        </Layout>
      </Suspense>
    </BrowserRouter>
  </StoreProvider>
);
