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
        className="hover:cursor-pointer justify-center hover:font-bold transition-all  duration-75 rounded "
      >
        <p className="flex gap-1 items-center">
          Logout <LogOut className="h-4" />
        </p>
      </button>
    </div>
  );
}
