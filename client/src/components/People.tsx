import axios from "axios";
// import { filter } from "framer-motion/client";
import { useEffect, useState } from "react";
import InputBox from "./InputBox";
import User from "./User";

interface User {
  _id: string;
  username: string;
}

export default function People() {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, SetFilter] = useState("");
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
  return (
    <div>
      <div>
        <InputBox
          onChange={(e) => {
            SetFilter(e.target.value);
          }}
          className="w-3xl rounded-full"
          placeholder="Pay by username..."
        />
      </div>
      <h1 className="text-xl  m-6 ">People</h1>
      <div className="flex gap-3 mx-10">

      {users.map((user) => (
          <User key={user._id} username={user.username} />
        ))}
        </div>
    </div>
  );
}
