import { useState } from 'react';
import { GoScreenFull } from "react-icons/go";
import { VscUnmute } from "react-icons/vsc";
import { VscMute } from "react-icons/vsc";

import Header from './components/Header';
import Timer from './components/Timer';
import Tasks from './components/Tasks';
import HowTo from './components/HowTo';

function App() {
  const TIMER_COLORS = {
    DEFAULT_TIMER: "#ab8971",
    BREAK_TIMER: "#689682",
    LONG_BREAK_TIMER: "#6a7cb0",
  };

  const [timerType, setTimerType] = useState("DEFAULT_TIMER");
  const [isMuted, setIsMutes] = useState(false);

  const timerColor = TIMER_COLORS[timerType];

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div style={{
      backgroundColor: timerColor,
      transition: "background-color 0.25s ease-in-out", 
    }} className="">
      <div className="h-full lg:h-screen w-full">
        <Header />
        <div className="flex flex-col md:flex-row m-1 md:mx-10 h-[78%]">
          <Timer timer={setTimerType} muted={isMuted}/>
          <Tasks />
        </div>
        <div className="flex md:w-full mb-10 pb-5 pr-10 justify-end gap-5">
          {isMuted && (
              <button onClick={() => setIsMutes(false)}>
                <VscMute size={24}/>
              </button>
            )
          }
          {!isMuted && (
              <button onClick={() => setIsMutes(true)}>
                <VscUnmute size={24}/>
              </button>
            )
          }
          <button onClick={toggleFullScreen}>
            <GoScreenFull size={24}/>
          </button>
        </div>
      </div>
      <section>
        <HowTo />
      </section>
    </div>
  );
}

export default App;
