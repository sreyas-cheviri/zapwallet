import { useEffect, useState } from "react";
import Card3D from "../components/Card3D";
import axios from "axios";
import CustomButton from "../components/CustomButton";
import InputBox from "../components/InputBox";
import { ArrowUpRight } from 'lucide-react';
import Navbar from "../components/Navbar";
import {  useNavigate } from "react-router-dom";
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
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-200 flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center mt-4 justify-center">
        <Card3D Balance={balance ?? 0} />
        <section className="flex  flex-col items-center justify-start p-4 bg-white rounded-t-3xl w-full max-w-4xl min-h-[400px] mt-8 ">
          <div className="mt-4 flex gap-2 items-center">
            <InputBox placeholder="₹ 00.00" />
            <CustomButton className="flex gap-1 items-center p-2">
              Send Money <ArrowUpRight />
            </CustomButton>
          </div>
          <p className="text-xs text-zinc-600 mt-4">
            Available Balance: {balance}
          </p>
        </section>
      </div>
    </div>
  );
}
