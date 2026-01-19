import { useState, useEffect } from 'react';

const Clock = ({ selectedTimer, isRunning }) => {
  const [elapsed, setElapsed] = useState(0);

  const MAX_SECONDS = 60 * 60;
  const sessionSeconds = Math.max(selectedTimer * 60, 1);
  const sessionFraction = sessionSeconds / MAX_SECONDS;
  const sessionAngle = sessionFraction * 360;

  const totalSeconds = Math.max(selectedTimer * 60, 1);
  const progress = elapsed / sessionSeconds;
  const angle = sessionAngle * (1 - progress); 

  const remainingSeconds = Math.max(totalSeconds - elapsed, 0);
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  useEffect(() => {
    setElapsed(0);
  }, [selectedTimer]);

  useEffect(() => {
    if (!isRunning || elapsed >= totalSeconds) return;

    const interval = setInterval(() => {
      setElapsed((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, elapsed, totalSeconds]);

  return (
    <div className="items-center gap-4">
      {/* TIMER BODY */}
      <div className="w-[400px] h-[400px] rounded-xl flex items-center justify-center relative">
        {/* DIAL */}
        <div className="relative w-[400px] h-[400px] rounded-lg flex items-center justify-center ">
          
          {/* TICKS */}
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className={`absolute ${
                i % 5 === 0 ? "h-5 w-[2px]" : "h-3 w-px"
              } bg-black z-10`}
              style={{
                transform: `rotate(${i * 6}deg) translateY(180px)` ,
              }}
            />
          ))}

          {/* RED WEDGE */}
          <div
            className="absolute w-full h-full shadow-md rounded-full"
            style={{
              background: `conic-gradient(
                #ef4444 ${angle}deg,
                white 0deg
              )`,
              transition: "background is linear",
            }}
          />

          {/* CENTER KNOB */}
          <div className="absolute w-[64px] h-[64px] bg-white rounded-full border border-gray-400 shadow-lg z-10" />
        </div>
      </div>
      <div className="items-center w-full justify-center flex text-4xl mt-10">
        <p className="font-turret-road font-semibold">{formattedTime}</p>
      </div>
    </div>
  );
};

export default Clock;