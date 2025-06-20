import { useEffect, useState } from "react";
import Card3D from "../components/Card3D";
import axios from "axios";
import CustomButton from "../components/CustomButton";
import InputBox from "../components/InputBox";
import { ArrowUpRight } from 'lucide-react';
import Navbar from "../components/Navbar";
import {  useNavigate } from "react-router-dom";
import People from "../components/People";
export default function Dashboard() {
  const [balance, setBalance] = useState<number | null>(null);
 const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if(!token){
        setTimeout(() => {
          
          navigate("/signin")
        }, 2000);
      }
      const res = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBalance(Math.floor(res.data.balance * 100) / 100);
    };
    fetchData();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-200 to-blue-900 flex flex-col relative overflow-hidden">
      
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='3.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noiseFilter)'/></svg>")`,
          opacity: 0.58, // adjust for effect
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      />
      <Navbar />
      <div className="flex-1 flex flex-col items-center md:mt-4 mt-16  relative z-10">
        <Card3D Balance={balance ?? 0} />
        <section className="flex  flex-col items-center justify-start p-4   bg-white rounded-t-3xl w-full md:max-w-4xl min-h-lvh mt-8 ">
          <div className="mt-4 flex gap-2 items-center">
            <InputBox placeholder="₹ 00.00" type="number" step={0.05} variant={"default"}  inputSize="md"/>
            <CustomButton className="flex gap-1 items-center p-2">
              Send  <ArrowUpRight />
            </CustomButton>
          </div>
          <p className="text-xs text-zinc-600 mt-4">
            Available Balance: {balance}
          </p>
          <div className="mt-8">

        <People/>
        
          </div>
        </section>
        
      </div>
    </div>
  );
}
