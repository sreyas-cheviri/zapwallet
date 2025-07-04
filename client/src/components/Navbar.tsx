import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const logoutFun = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };
  return (
    <div className="w-full flex px-10 py-4 justify-between items-center text-blue-800">
      <div className="flex gap-2 items-center">
        <img src="/wallet.svg" className="h-6 w-6" alt="" />
        <h1 className="md:text-xl text-xl font-semibold text-blue-800">
          ZapWallet
        </h1>
      </div>
      <button
        onClick={logoutFun}
        className="hover:cursor-pointer justify-center  rounded "
      >
        <p className="flex gap-1 items-center ">
           <LogOut className="h-7 rounded w-7 hover:bg-blue-100 p-1 transition-all  duration-75" />
        </p>
      </button>
    </div>
  );
}
