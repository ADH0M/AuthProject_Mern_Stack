import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import NavBar from '../components/layout/NavBar';

const context = createContext();
const AuthContext = ({ children }) => {
  const [logedIn, setLogedIn] = useState(undefined);
  async function logedInFunc() {
    const req = await axios.get('http://localhost:3000/api/logedin');
    setLogedIn(req.data);
  }
  useEffect(() => {
    logedInFunc();
  }, []);
  return (
    <context.Provider value={{ logedIn, logedInFunc }}>
      {children}
    </context.Provider>
  );
};

export default AuthContext;
export{context}
