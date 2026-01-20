import { useState, useEffect } from 'react';
import alarmSound from '../assets/mixkit-alert-bells-echo-765.wav';

const Clock = ({ selectedTimer, isRunning, muted, resetKey }) => {
  const [elapsed, setElapsed] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [timer, setTimer] = useState(null);

  const MAX_SECONDS = 60 * 60;
  const sessionSeconds = Math.max(timer * 60, 1);
  const sessionFraction = sessionSeconds / MAX_SECONDS;
  const sessionAngle = sessionFraction * 360;

  const totalSeconds = Math.max(timer * 60, 1);
  const progress = elapsed / sessionSeconds;
  const angle = sessionAngle * (1 - progress); 

  const remainingSeconds = Math.max(totalSeconds - elapsed, 0);
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  useEffect(() => {
    setElapsed(0);
    setTimer(selectedTimer);
  }, [selectedTimer, resetKey]);

  useEffect(() => {
    if (!isRunning || elapsed >= totalSeconds) return;

    const interval = setInterval(() => {
      setElapsed((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, elapsed, totalSeconds]);

  useEffect(() => {
    if (remainingSeconds === 0 && !muted) {
      const alarm = new Audio(alarmSound);
      let count = 0;

      const playInterval = setInterval(() => {
        alarm.currentTime = 0; // reset to start
        alarm.play();
        count++;
        if (count === 3) {
          clearInterval(playInterval);
        }
      }, 2000);
    }
  }, [remainingSeconds]);

  const handleCustomTimer = (minutes) => {
    setElapsed(0); // reset elapsed
    setTimer(minutes); // you’ll need to lift this state up if it’s passed as prop
  };

  useEffect(() => {
    if (isRunning) {
      document.title = `${formattedTime}`;
    } else {
      document.title = "The Pomodoro Technique";
    }

    return () => {
      document.title = "The Pomodoro Technique";
    };
  }, [formattedTime, isRunning]);

  return (
    <div className="items-center gap-4">
      {/* TIMER BODY */}
      <div className="w-[250px] h-[250px] md:w-[450px] md:h-[450px] rounded-3xl flex items-center bg-gray-700 shadow-md justify-center relative">
        {/* DIAL */}
        <div className="relative w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-2xl bg-gray-200 shadow-sm flex items-center justify-center [--tick-radius:88px]
          md:[--tick-radius:180px]">
        
          {/* TICKS */}
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className={`absolute bg-black z-10
                ${i % 5 === 0 ? "h-4 w-[2px]" : "h-2 w-px"}
                sm:${i % 5 === 0 ? "h-5" : "h-3"}
              `}
              style={{
                transform: `rotate(${i * 6}deg) translateY(var(--tick-radius))`,
              }}
            />
          ))}


          {/* RED WEDGE */}
          <div
            className="absolute w-[95%] h-[95%] shadow-lg opacity-80 rounded-full"
            style={{
              '--angle': `${angle}deg`,
              background: `conic-gradient(#ef4444 var(--angle), white 0deg)`,
              transition: 'transform 0.5s linear',
            }}
          />
          {/* ARM */}
          <div
            className="absolute w-full h-full flex items-center justify-center pointer-events-none"
          >
            <div
              className="absolute bottom-1/2 w-[10px] h-[50px] bg-black rounded-full origin-bottom"
              style={{
                transform: `rotate(${angle}deg)`,
                transition: "transform 0.5s linear",
              }}
            />
          </div>
          {/* CENTER KNOB */}
          <div className="absolute w-[64px] h-[64px] bg-black rounded-full shadow-md z-10" />
        </div>
      </div>
      <div className="items-center w-full justify-center flex text-4xl mt-8">
  {isEditing ? (
    <input
      type="number"
      min="1"
      value={customInput}
      onChange={(e) => setCustomInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          const minutes = parseFloat(customInput);
          if (!isNaN(minutes) && minutes > 0) {
            handleCustomTimer(minutes); 
            setIsEditing(false);
          }
        } else if (e.key === "Escape") {
          setIsEditing(false); // cancel editing
        }
      }}
      className="w-[150px] text-center text-4xl border-b border-gray-400 focus:outline-none"
      autoFocus
    />
  ) : (
    <p
      className="font-turret-road font-semibold cursor-pointer"
      onClick={() => {
        setCustomInput(Math.floor(timer)); // default value
        setIsEditing(true);
      }}
    >
      {formattedTime}
    </p>
  )}
</div>
    </div>
  );
};

export default Clock;