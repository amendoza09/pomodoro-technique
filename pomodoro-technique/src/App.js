import Header from './components/Header';
import Timer from './components/Timer';
import Tasks from './components/Tasks'

function App() {
  return (
    <div className="bg-[#ab8971] h-screen w-screen">
      <Header />
      <div className="flex flex-row m-10 h-[90%]">
        <Timer />
        <Tasks />
      </div>
    </div>
  );
}

export default App;
