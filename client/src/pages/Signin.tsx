import React, { useState } from 'react';
import InputBox from '../components/InputBox';
import CustomButton from '../components/CustomButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Brand from '../components/Brand';

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
      localStorage.setItem("id", data.id);

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
    <div className="min-h-screen flex transition-all duration-200 ">
      <div className="w-1/2 inset-0 z-0 bg-gradient-to-br hidden md:flex from-blue-100 border-r border-dashed border-blue-700 to-blue-200 items-center justify-center relative">
       
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='1.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noiseFilter)'/></svg>")`,
            opacity: 0.38,
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
          }}
        />
 
        <div className="relative z-10">
          <Brand />
        </div>
      </div>
      <div className="md:w-1/2 w-full m-5 flex items-center justify-center z-20 ">
        <form
          onSubmit={handleSignin}
          className="w-full max-w-sm flex flex-col bg-gradient-to-br from-blue-100 to-blue-200 gap-5 border p-10 rounded-2xl border-blue-200"
        > <div className='md:hidden block '> 
     <h1 className="md:text-3xl text-2xl font-semibold text-blue-800 mb-4">ZapWallet</h1>
      </div>
          <h2 className="text-4xl font-semibold text-blue-800 mb-2">Sign In</h2>
          <InputBox
            label="Email"
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)} variant={'default'} inputSize={'md'}          />
          <InputBox
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)} variant={'default'} inputSize={'md'}          />
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
                <p className="text-xs text-gray-600 mt-1">
  <strong>Demo Credentials:</strong><br />
  Email: jack@gmail.com<br />
  Password: jack!@#
</p>
<p className="text-xs mt-1 text-gray-600">
  Wallet balance is randomly generated for each user in this project.
</p>


        </form>
      </div>
    </div>
  )
}
