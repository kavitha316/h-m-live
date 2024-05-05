import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import HomePage from './pages/HomePage.tsx';
import ProductPage from './pages/ProductPage.tsx';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StoreProvider } from './Store.tsx';
import React from 'react';
import CartPage from './pages/CartPage.tsx';
import SigninPage from './pages/SigninPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import ShippingAddressPage from './pages/ShippingAddressPage.tsx';
import PaymentMethodPage from './pages/PaymentMethodPage.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import PlaceOrderPage from './pages/PlaceOrderPage.tsx';
import OrderPage from './pages/OrderPage.tsx';
import OrderHistoryPage from './pages/OrderHistoryPage.tsx';
import ProductListingPage from './pages/ProductListingPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
//import {RazorPayment} from 'razorpay-typescript'

// axios.defaults.baseURL =
//   process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '/'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path="product-category/:slug" element={<ProductListingPage />} />
      <Route path="product/:slug" element={<ProductPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="signin" element={<SigninPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="" element={<ProtectedRoute />}>
        <Route path="shipping" element={<ShippingAddressPage />} />
        <Route path="payment" element={<PaymentMethodPage />} />
        <Route path="placeorder" element={<PlaceOrderPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/orderhistory" element={<OrderHistoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Route>
  )
);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
        </HelmetProvider>
   </StoreProvider>
   </React.StrictMode>
)
