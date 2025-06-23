import axios from "axios";
import { useEffect, useRef, useState } from "react";
import InputBox from "./InputBox";
import User from "./User";
import CustomButton from "./CustomButton";
import { ArrowUpRight, CircleX } from "lucide-react";
// import { Send } from "lucide-react";

interface User {
  email: string;
  _id: string;
  username: string;
  balance: number;
}

export default function People({
  Balance,
  refreshBalance,
}: {
  Balance: number;
  refreshBalance: () => void;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, SetFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [amount, setAmount] = useState(0.0);
  const [err, setErr] = useState("");
  const input = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    const fetch = async () => {
      // const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:3000/api/v1/user/bulk?filter=" + filter
      );

      setUsers(res.data.users || []);
    };
    fetch();
  }, [filter]);

  const handlePayment = async () => {
    if (!amount) {
      setErr("enter an amount");
      input.current?.focus();
      return;
    }
    if (!selectedUser) {
      setErr("please select a user!");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          recevierID: selectedUser._id,
          amount: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setErr("");
      refreshBalance();
      input.current.value = "";
      setAmount(0);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setErr(error.response.data.message);
      } else {
        setErr("Transfer failed");
      }
    }
  };
  const currentuser = localStorage.getItem('username');
  console.log("currentuser", currentuser, "users", users.map(u => u._id));
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-4 flex gap-2 items-center">
        <InputBox
          inputRef={input}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder={amount === 0 ? "0.00" : amount.toString()}
          type="number"
          step={0.05}
          variant="default"
          inputSize="md"
          className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <CustomButton
          onClick={handlePayment}
          className="flex gap-1 items-center p-2 cursor-pointer"
        >
          Pay <ArrowUpRight />
        </CustomButton>
      </div>
      <p className="text-xs text-zinc-600 mt-4 mb-12">
        Available Balance: {Balance}
      </p>
      {err && <p className="m-2 text-red-600 font-semibold">{err}</p>}
      {selectedUser && (
        <div className="flex flex-col w-1/2 relative items-center justify-center font-mono bg-gray-100/60 p-4 rounded-2xl gap-.5 text-xl text-blue-900 mb-14 ">
          <CircleX
            size={"15px"}
            className=" hover:text-gray-500 transition-all duration-500 ease-in-out  absolute top-2 right-2 cursor-pointer"
            onClick={() => setSelectedUser(null)}
          />
          <h1>Recipient : {selectedUser.username}</h1>
          <p className="text-xs ">{selectedUser.email}</p>
        </div>
      )}
      <div>
        <InputBox
          onChange={(e) => {
            SetFilter(e.target.value);
          }}
          className="md:w-3xl min-w-full rounded-full"
          placeholder="Pay by name..."
          variant={"search"}
          inputSize={"lg"}
        />
      </div>

      <div className="flex gap-3 mt-10 px-14 flex-wrap justify-center w-full">
        {users
          .filter(user => user.username.toString() !== (currentuser ?? "").toString())
          .map(user => (
            <User
              key={user._id}
              username={user.username}
              email={user.email}
              onSelect={() => { setSelectedUser(user); setErr('') }}
            />
          ))}
      </div>
    </div>
  );
}
