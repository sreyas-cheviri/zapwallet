import React, { useState } from 'react';
import InputBox from '../components/InputBox';
import CustomButton from '../components/CustomButton';
import { useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen flex">
      
      <div className="w-1/2 bg-gradient-to-br hidden md:flex from-blue-100 border-r border-dashed border-blue-700 to-blue-200  items-center justify-center">
      <div className=''>

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
          onSubmit={handleSignup}
          className="w-full max-w-sm flex flex-col bg-gradient-to-br from-blue-100 to-blue-200 gap-5 border p-10 rounded-2xl border-blue-200"
        >
          <h2 className="text-4xl font-semibold text-blue-800 mb-2">Sign Up</h2>
          <InputBox
            label="Username"
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={e => setUsername(e.target.value)}
          />
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
