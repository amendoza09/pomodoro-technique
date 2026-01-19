import { useState } from 'react'
import Clock from './Clock';

const Timer = () => {
  const DEFAULT_TIMER = 25;
  const BREAK_TIMER = 5;
  const LONG_BREAK_TIMER = 15;

  const [selectedTimer, setSelectedTimer] = useState(DEFAULT_TIMER);
  const [running, setRunning] = useState(false);

  const handleSelect = (time) => {
    setRunning(false); 
    setSelectedTimer(time);
  };

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        setRunning(!running);
        event.preventDefault(); 
    }
});

  return (
    <div className="w-1/2 flex flex-col items-center justify-center">
      {/* MODE SELECT */}
      <div className="flex flex-row gap-10 text-lg">
        <button
          onClick={() => handleSelect(DEFAULT_TIMER)}
          className={`px-4 py-2 rounded ${
            selectedTimer === DEFAULT_TIMER ? "bg-gray-300" : ""
          }`}
        >
          Pomodoro
        </button>
        <button
          onClick={() => handleSelect(BREAK_TIMER)}
          className={`px-4 py-2 rounded ${
            selectedTimer === BREAK_TIMER ? "bg-gray-300" : ""
          }`}
        >
          Break
        </button>
        <button
          onClick={() => handleSelect(LONG_BREAK_TIMER)}
          className={`px-4 py-2 rounded ${
            selectedTimer === LONG_BREAK_TIMER ? "bg-gray-300" : ""
          }`}
        >
          Long Break
        </button>
      </div>
            <div className="justify-center flex flex-col my-10 gap-5 items-center">
                <Clock selectedTimer={selectedTimer} isRunning={running}/>
                <div className="flex flex-row gap-10">
                    <button onClick={() => setRunning(true)} className="">
                        Start
                    </button>
                    <button onClick={() => setRunning(false)} >
                        Stop
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Timer;