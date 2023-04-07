import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import App from './App'

import { Main } from './components/Main/Main'
import SignUp from './components/Signup/Signup'
import SignIn from './components/Signin/Signin'
import { store } from './Redux/store'
import Cotolog from './components/Cotolog/Cotolog'
import Cart from './components/Cart/Cart'
import DetailPage from './components/DatailPage/DetailPage'
import { UserPage } from './components/UserPage/UserPage'
import FavoritesPage from './components/Favorites/Favorirites'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/products',
        element: <Cotolog />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/user/:id',
        element: <UserPage />,
      },
      {
        path: '/favorites',
        element: <FavoritesPage />,
      },
      {
        path: '/product/:id',
        element: <DetailPage />,
      },

    ],
  },
])

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(

  <React.StrictMode>

    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>

  </React.StrictMode>,
)
