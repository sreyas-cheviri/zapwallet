import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";
import Chips from "./Chips";

interface Card3DProps {
  Balance: number;
}

function Card3D({ Balance }: Card3DProps) {
  const username = localStorage.getItem("username");
  // const randomVAlue = Math.floor(Math.random() * 1000);
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

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
      className="relative hover:cursor-pointer md:w-96 w-80 h-44 md:h-56 bg-gradient-to-br from-zinc-800  to-blue-800 rounded-2xl shadow-gray-500 hover:shadow-2xl shadow-lg flex items-end justify-between text-white overflow-hidden "
      style={{
        perspective: "1000px",
        rotateX: springX,
        rotateY: springY,
        scale: 1.05,
        transition: "box-shadow 0.3s",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        handleMouseLeave();
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
    >
      {/* Shine beam */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 320, opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              background:
                "linear-gradient(120deg, rgba(255,255,255,0) 60%, rgba(255,255,255,0.5) 80%, rgba(255,255,255,0) 100%)",
              width: "80%",
              height: "100%",
              mixBlendMode: "lighten",
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: shineBg,
          zIndex: 2,
        }}
      />

      <Chips />

      <div className="absolute top-15 left-6 text-xs sm:text-sm flex justify-between font-mono tracking-widest z-10 select-none w-[90%]">
        <div>3857&nbsp; 2569 &nbsp;9012&nbsp;3456ZAPWALLET</div>
      </div>

      <div className="top-20 sm:top-24 mx-6 sm:mx-6 absolute w-[90%]">
        <h1 className="text-base sm:text-2xl font-bold max-w-full truncate">
          <span className="text-xs sm:text-lg font-semibold">Balance:</span>
          &nbsp;₹ {Balance}
        </h1>
      </div>

      <div className="flex justify-between w-full p-3 sm:p-6 z-10">
        <div className="flex flex-col">
          <p className="text-[10px] sm:text-xs  text-zinc-300 tracking-widest">
            USER
          </p>
          <p className="text-xs sm:text-sm font-semibold tracking-wide">
            {username}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-[10px] sm:text-xs text-zinc-300 tracking-widest">
            EXPIRES
          </p>
          <p className="text-xs sm:text-sm font-semibold tracking-wide">
            12/29
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Card3D;
