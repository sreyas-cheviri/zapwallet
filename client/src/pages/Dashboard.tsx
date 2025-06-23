import { useEffect, useState } from "react";
import Card3D from "../components/Card3D";
import axios from "axios";
// import CustomButton from "../components/CustomButton";
// import InputBox from "../components/InputBox";
// import { ArrowUpRight } from 'lucide-react';
import Navbar from "../components/Navbar";
import {  useNavigate } from "react-router-dom";
import People from "../components/People";
export default function Dashboard() {
  const [balance, setBalance] = useState<number | null>(null);
  const navigate = useNavigate();

  const fetchBalance = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
      return;
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

  useEffect(() => {
    fetchBalance();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-200 to-blue-900 flex flex-col relative overflow-hidden">
      
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='3.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noiseFilter)'/></svg>")`,
          opacity: 0.68, // adjust for effect
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      />
      <Navbar />
      <div className="flex-1 flex flex-col gap-8 items-center md:mt-4 mt-16 relative z-10">
        <Card3D Balance={balance ?? 0} />
        <section className="flex flex-col items-center justify-start p-4 bg-white rounded-t-3xl w-full md:max-w-4xl mt-auto min-h-[390px]">
         
          <div >
            <People Balance={balance ?? 0} refreshBalance={fetchBalance} />
          </div>
        </section>
        
      </div>
    </div>
  );
}
