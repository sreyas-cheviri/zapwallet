import { useNavigate } from "react-router-dom";
import Brand from "../components/Brand";
import LinesDeco from "../components/LinesDeco";
// import Card3D from '../components/Card3D';

export default function Home() {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signin");
  };

  return (
    <div className="h-screen w-screen  bg-gradient-to-b from-white via-blue-100 to-blue-900 relative overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='1.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noiseFilter)'/></svg>")`,
          opacity: 0.38,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      />
      <LinesDeco />

      <div className="relative z-20 text-center h-screen flex flex-col items-center justify-center px-4">
        <Brand />
        <button
          onClick={handleSignup}
          className="bg-blue-800 hover:bg-blue-900 hover:shadow-xl text-sm md:text-md text-zinc-100 font-medium py-2 px-8 rounded-lg transition duration-200 shadow"
        >
          Get started
        </button>
        {/* <Card3D Balance={0}/> */}
      </div>
    </div>
  );
}
