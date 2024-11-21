import axios from 'axios'
import { useContext } from 'react';
import { context } from '../context/AuthContext';
import {useNavigate } from 'react-router-dom';

const LogOut = () => {
    const {logedInFunc} =useContext(context);
    const navegate = useNavigate()
    const handleBtn = async()=>{
        const req = await axios.get(`${import.meta.env.VITE_BASE_URL}/logout`);
        await logedInFunc();
        
        navegate('/')
    }
  return (
    <button onClick={()=>{handleBtn()}}>LogOut</button>
  )
}

export default LogOut