import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

interface Card3DProps {
  Balance: number;
}

function Card3D({ Balance }: Card3DProps) {

    const username = localStorage.getItem("username");
    const randomVAlue =Math.floor(Math.random()*1000);
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Add spring for smoothness
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  // For shine effect
  const shineX = useMotionValue(50);
  const shineY = useMotionValue(50);
  const shineBg = useMotionTemplate`radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.10) 40%, transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const newRotateX = ((y - centerY) / centerY) * 15;
    const newRotateY = ((x - centerX) / centerX) * 15;
    rotateX.set(-newRotateX);
    rotateY.set(newRotateY);

    shineX.set((x / rect.width) * 100);
    shineY.set((y / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    shineX.set(50);
    shineY.set(50);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative w-96 h-56 bg-gradient-to-br from-zinc-800  to-blue-800 rounded-2xl shadow-gray-500 hover:shadow-2xl shadow-lg flex items-end justify-between text-white overflow-hidden "
      style={{
        perspective: "1000px",
        rotateX: springX,
        rotateY: springY,
        scale: 1.05,
        transition: "box-shadow 0.3s",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Shine effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: shineBg,
          zIndex: 2,
        }}
      />
      {/* Card content */}
      <div className="absolute top-6 left-6 w-12 h-8 bg-gradient-to-br from-zinc-300  to-zinc-600 rounded-md shadow-inner opacity-80 z-10" />
      <div className="absolute top-14 left-6 text-sm flex justify-between font-mono tracking-widest z-10 select-none">
        <div>

        {randomVAlue}&nbsp;{randomVAlue*4}&nbsp;9012&nbsp;3456
        </div>
        <div>
            <p>ZAPWALLET</p>
        </div>
      </div>


       <div className="top-24 mx-6 absolute">
        <p></p>
        <h1 className="text-2xl font-bold max-w-[220px] truncate">
  <span className="text-lg font-semibold">Balance:</span>&nbsp;₹ {Balance} 
</h1>
      </div>
     
      <div className="flex justify-between w-full p-6 z-10">
        <div className="flex flex-col">
          <p className="text-xs text-zinc-300 tracking-widest">CARD HOLDER</p>
          <p className="text-sm font-semibold tracking-wide">{username}</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-xs text-zinc-300 tracking-widest">EXPIRES</p>
          <p className="text-sm font-semibold tracking-wide">12/29</p>
        </div>
      </div>
     
      
    </motion.div>
  );
}

export default Card3D;
