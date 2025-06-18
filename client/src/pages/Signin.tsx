import React, { useState } from 'react';
import InputBox from '../components/InputBox';
import CustomButton from '../components/CustomButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await axios.post('http://localhost:3000/api/v1/user/signin', {
        email,
        password,
      });
      const data = res.data;
      setMsg('Signin successful!');
      const token = data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("username", data.username);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response && err.response.data && err.response.data.message) {
        setMsg(err.response.data.message);
      } else {
        setMsg('Signin failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-gradient-to-br hidden md:flex from-blue-100 to-blue-200 items-center justify-center">
        <div>
          <img
            src="/wallet.svg"
            className="md:h-12 h-10 hover:cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1"
            onClick={() => { window.location.href = "/"; }}
            alt=""
          />
          <h1 className="md:text-3xl text-2xl font-semibold text-blue-800 mb-4">ZapWallet</h1>
          <p className="text-gray-600 mb-8">
            Fast . Secure . Simple
          </p>
        </div>
      </div>
      <div className="md:w-1/2 w-full m-5 flex items-center justify-center ">
        <form
          onSubmit={handleSignin}
          className="w-full max-w-sm flex flex-col bg-gradient-to-br from-blue-100 to-blue-200 gap-5 border p-10 rounded-2xl border-blue-200"
        >
          <h2 className="text-4xl font-semibold text-blue-800 mb-2">Sign In</h2>
          <InputBox
            label="Email"
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />
          <InputBox
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
          />
          <CustomButton type="submit">Sign In</CustomButton>
          {msg && (
            <div className="text-center text-sm mt-2 text-blue-700">{msg}</div>
          )}
          <p className='text-sm gap-2'>
            Don't have an account?
            <span onClick={() => navigate('/signup')} className='text-blue-900 pl-2 underline hover:text-blue-300 hover:cursor-pointer'>
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}
