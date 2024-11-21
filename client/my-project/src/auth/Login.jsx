import axios from '../api/api';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { context } from '../context/AuthContext';

const Login = () => {
  const { logedInFunc } = useContext(context);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post('login', formData, {
      withCredentials: true,
    });
    await logedInFunc();
    navigate('/');
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="email">
          password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>

        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Login;
