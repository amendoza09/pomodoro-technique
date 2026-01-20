import { useState, useEffect, useRef } from 'react'
import { RiResetLeftFill } from "react-icons/ri";
import Clock from './Clock';

const Timer = ({ timer, muted }) => {
  const DEFAULT_TIMER = 25;
  const BREAK_TIMER = 5;
  const LONG_BREAK_TIMER = 15;

  const [selectedTimer, setSelectedTimer] = useState(DEFAULT_TIMER);
  const [running, setRunning] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleSelect = (time, type) => {
    if(running){
      setRunning(false); 
    } else {
      setSelectedTimer(time);
      timer(type);
    }
    
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const tag = event.target.tagName;

      // Don't hijack space when typing
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (event.code === "Space") {
        event.preventDefault();
        setRunning((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="md:w-1/2 flex flex-col items-center justify-center">
      {/* MODE SELECT */}
      <div className="flex flex-row gap-10 md:text-lg">
        <button
          onClick={() => {
            handleSelect(DEFAULT_TIMER, "DEFAULT_TIMER");
            if(running) {
              setRunning(false);
            }
          }}
          className={`px-2 md:px-4 md:py-2 rounded ${
            selectedTimer === DEFAULT_TIMER ? "bg-white shadow-sm" : ""
          } `}
        >
          Pomodoro
        </button>
        <button
          onClick={() => {
            handleSelect(BREAK_TIMER, "BREAK_TIMER");
            if(running) {
              setRunning(false);
            }
          }}
          className={`px-2 md:px-4 md:py-2 rounded ${
            selectedTimer === BREAK_TIMER ? "bg-white shadow-sm" : ""
          }`}
        >
          Break
        </button>
        <button
          onClick={() => {
            handleSelect(LONG_BREAK_TIMER, "LONG_BREAK_TIMER")
            if(running) {
              setRunning(false);
            }
          }}
          className={`px-2 md:px-4 md:py-2 rounded ${
            selectedTimer === LONG_BREAK_TIMER ? "bg-white shadow-sm" : ""
          }`}
        >
          Long Break
        </button>
      </div>
      <div className="justify-center flex flex-col my-10 gap-5 items-center">
        <Clock selectedTimer={selectedTimer} isRunning={running} muted={muted} resetKey={resetKey}/>
        <div className="flex flex-row gap-10">
          <button disabled={running} onClick={() => setRunning(true)} className={running ? "bg-gray-300 w-[80px] h-10 rounded-lg shadow-sm" : "bg-[#84b867] w-[80px] h-10 rounded-lg shadow-sm"}>
            Start
          </button>
          <button onClick={() => setRunning(false)} >
            Pause
          </button>
          <button disabled={running} onClick={() => {setRunning(false); setResetKey((k) => k + 1)}} >
            <RiResetLeftFill />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Timer;