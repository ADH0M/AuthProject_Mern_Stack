import axios from '../api/api';
import { useContext, useState } from 'react';
import { context } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {logedInFunc} =useContext(context);
  const navigate = useNavigate()
  const [dataForm, setDataForm] = useState({
    email: '',
    password: '',
    passwordVerify: '',
  });

  const handelChange = (e) => {
    setDataForm((prev) => {
      const { name, value } = e.target;
      return { ...prev, [name]: value };
    });
  };

  const handelSubmit =async(e)=>{
    try{

      e.preventDefault();
      const data = await axios.post('auth' , dataForm ,{
        withCredentials:true
      });
      await logedInFunc();
      navigate('/')


    }catch(err){
      console.error(err)
    }

  }
  return (
    <form onSubmit={handelSubmit}>
      <label htmlFor="email">
        email
        <input
          type="email"
          required
          name="email"
          value={dataForm.email}
          onChange={handelChange}
        />
      </label>

      <label htmlFor="password">
        password
        <input
          type="password"
          required
          name="password"
          onChange={handelChange}
        />
      </label>

      <label htmlFor="passwordVerify">
        password verify
        <input
          type="passwordVerify"
          required
          name="passwordVerify"
          onChange={handelChange}
        />
      </label>
      <button type="submit">submit</button>
    </form>
  );
};

export default Login;
