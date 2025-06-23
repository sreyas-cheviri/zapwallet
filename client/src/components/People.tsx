import axios from "axios";
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
    <div className="flex flex-col justify-center items-center">
      <div>
        <InputBox
                  onChange={(e) => {
                      SetFilter(e.target.value);
                  } }
                  className="md:w-3xl min-w-full rounded-full"
                  placeholder="Pay by name..." variant={"search"} inputSize={"lg"}        />
      </div>
      {/* <h1 className="text-xl  m-6 ">People</h1> */}
      <div className="flex gap-3 m-6 flex-wrap justify-center">

      {users.map((user) => (
          <User key={user._id} username={user.username} />
        ))}
        </div>
    </div>
  );
}
