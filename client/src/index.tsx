import React from 'react';
import ReactDOM from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import OrderPage from './pages/Order.page';
import PaymentPage from './pages/Payment.page';

const router = createBrowserRouter([
   {
      path: '/',
      element: <App />,
      children: [
         {
            index: true,
            element: <OrderPage />,
         },
         {
            path: '/payment/order/:orderId',
            element: <PaymentPage />,
         },
      ],
      errorElement: (
         <div className='App'>
            <h2>Page not found</h2>
         </div>
      ),
   },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
   <PrimeReactProvider>
      <RouterProvider router={router} />
   </PrimeReactProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
