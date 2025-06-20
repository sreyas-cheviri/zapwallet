interface UserProps {
  username: string;
}

export default function User({ username }: UserProps) {
//   const gradients = ["to-blue-700", "to-blue-800", "to-blue-900"];
//   const randomGradient =
//     gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <div className="flex flex-col gap-1 hover:bg-gray-100 p-6 py-3 transition-all duration-150 rounded-2xl items-center cursor-pointer">
      <div
        className={`rounded-full w-12 h-12 bg-gradient-to-b bg-blue-800 text-white p-3 flex items-center justify-center text-2xl`}
      >
        {username[0].toLocaleUpperCase()}
      </div>
      <p>{username}</p>
    </div>
  );
}
