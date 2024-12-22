import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";

const App = () => {
  return (
    <div className="w-[90vw] h-[90vh] flex  bg-[#111928bf] rounded-lg backdrop-blur-xl backdrop-saturate-150 border-black border-opacity-10">
      <List/>
      <Chat/>
      <Detail/>
    </div>
  );
};

export default App;
