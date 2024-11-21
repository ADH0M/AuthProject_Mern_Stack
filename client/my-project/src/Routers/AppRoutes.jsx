import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from '../auth/SignUp';
import NavBar from '../components/layout/NavBar';
import Login from '../auth/Login';
import Home from '../components/pages/Home';
import { useContext } from 'react';
import { context } from '../context/AuthContext';
import Customers from '../components/pages/Customers';

const AppRoutes = () => {
  const { logedIn } = useContext(context);
  console.log(logedIn);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <NavBar />,
      children: [
        { index: true, element: <Home /> },
        {
          path: '/signin',
          element: <>{logedIn===false && <SignUp />}</>,
        },
        {
          path: '/login',
          element: <>{logedIn ===false && <Login />}</>,
        },
        {
          path: '/customers',
          element: <>{logedIn ===true && <Customers/> }</>,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRoutes;
