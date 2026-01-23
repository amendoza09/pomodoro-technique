import { useState, useEffect, useRef } from 'react';
import alarmSound from '../assets/mixkit-alert-bells-echo-765.wav';

const Clock = ({ selectedTimer, isRunning, muted, resetKey, timerFinish }) => {
  const [elapsed, setElapsed] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [timer, setTimer] = useState(null);
  const startTimeRef = useRef(null);

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

    startTimeRef.current = Date.now() - elapsed * 1000;
    const interval = setInterval(() => {
      const now = Date.now();
      const secondsElapsed = Math.floor (
        (now - startTimeRef.current) / 1000
      );
      setElapsed(secondsElapsed);
    }, 250);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (remainingSeconds === 0 && !muted) {
      const alarm = new Audio(alarmSound);
      let count = 0;
      
      const playInterval = setInterval(() => {
        alarm.currentTime = 0;
        alarm.play();
        count++;
        if (count === 3) {
          clearInterval(playInterval);
        }
      }, 1800);
    }
  }, [remainingSeconds]);
  useEffect(() => {
    if (remainingSeconds === 0) {
      timerFinish();
    }
  })

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
      <div className="w-[250px] h-[250px] lg:w-[450px] lg:h-[450px] rounded-3xl flex items-center bg-gray-700
         justify-center relative shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
        {/* DIAL */}
        <div className="relative w-[200px] h-[200px] lg:w-[400px] lg:h-[400px] rounded-2xl bg-gray-200 flex 
          items-center justify-center [--tick-radius:88px] lg:[--tick-radius:180px] shadow-[inset_0_6px_10px_rgba(0,0,0,0.25),0_8px_16px_rgba(0,0,0,0.25)]">
        
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