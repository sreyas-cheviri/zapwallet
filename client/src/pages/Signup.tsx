import React, { useState } from 'react';
import InputBox from '../components/InputBox';
import CustomButton from '../components/CustomButton';
import { useNavigate } from 'react-router-dom';
import Brand from '../components/Brand';

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch('http://localhost:3000/api/v1/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg('Signup successful! You can now log in.');
        setTimeout(() => {
          navigate('/signin');
        }, 1500);
      } else {
        setMsg(data.message || 'Signup failed');
      }
    } catch {
      setMsg('Network error');
    }
  };

  return (
    <div className="min-h-screen flex  transition-all duration-300">
     
      <div className="w-1/2 bg-gradient-to-br hidden md:flex from-blue-100 border-r border-dashed border-blue-700 to-blue-200 items-center justify-center relative">
        {/* SVG noise layer */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='1.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noiseFilter)'/></svg>")`,
            opacity: 0.38,
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
          }}
        />
        {/* Brand above the noise */}
        <div className="relative z-10">
          <Brand />
        </div>
      </div>
      <div className="md:w-1/2 w-full m-5 flex items-center justify-center ">
       
        <form
          onSubmit={handleSignup}
          className="w-full max-w-sm flex flex-col bg-gradient-to-br from-blue-100 to-blue-200 gap-5 border p-10 rounded-2xl border-blue-200"
        >
          <div className='md:hidden block '> 
     <h1 className="md:text-3xl text-2xl font-semibold text-blue-800 mb-4">ZapWallet</h1>
      </div>
          <h2 className="text-4xl font-semibold text-blue-800 mb-2">Sign Up</h2>
          <InputBox
            label="Username"
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={e => setUsername(e.target.value)} variant={'default'} inputSize={'md'}          />
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
          <CustomButton type="submit">Sign Up</CustomButton>
          {msg && (
            <div className="text-center text-sm mt-2 text-blue-700">{msg}</div>
          )}
          <p className='text-sm gap-2'>
            Already have an account? 
          

            <span onClick={() => navigate('/signin')} className='text-blue-900 pl-2 underline hover:text-blue-300 hover:cursor-pointer'>
              Sign in
              </span>
            
          </p>
        </form>
      </div>
    </div>
  );
}
