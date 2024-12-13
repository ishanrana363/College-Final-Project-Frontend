import { createRoot } from 'react-dom/client'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { router } from './router/router.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <QueryClientProvider client={queryClient} >
      <HelmetProvider>
        <RouterProvider router={router} >
        </RouterProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </Provider  >,
)
