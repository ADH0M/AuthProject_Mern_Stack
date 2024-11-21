import  axios  from 'axios';
import AuthContext from './context/AuthContext';
import AppRoutes from './Routers/AppRoutes';

axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <AuthContext>
        <AppRoutes />
      </AuthContext>
    </>
  );
}

export default App;
