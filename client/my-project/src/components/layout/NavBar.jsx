import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { context } from '../../context/AuthContext';
import LogOut from '../../auth/LogOut';

const NavBar = () => {
  const { logedIn } = useContext(context);

  return (
    <>
      <div className="w-full bg-gray-800">
        <ul className="flex gap-4 p-2 justify-center text-gray-50">
          <Link to={'/'}>home</Link>

          {logedIn === true && (
            <>
              <Link to={'/customers'}>customers</Link>
              <LogOut/>
            </>
          )}
          {logedIn === false && (
            <>
              <Link to={'/login'}>logIn</Link>
              <Link to={'/signin'}>Sign In</Link>
            </>
          )}
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default NavBar;
