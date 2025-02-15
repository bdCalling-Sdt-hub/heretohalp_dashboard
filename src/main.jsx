import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {
  
  RouterProvider,
} from "react-router-dom";
import { router } from './routes/Router';
import { persistor, store } from './page/redux/store';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import { PersistGate } from 'redux-persist/integration/react';




createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
