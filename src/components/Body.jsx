import Chat from "./chat/Chat";
import Detail from "./detail/Detail";
import List from "./list/List";
import Login from "./login/Login";
import Notification from "./notification/Notification";

import { useUserStore } from "../library/userStore";
import { useChatStore } from "../library/chatStore";

const Body = () => {
  const { currentUser } = useUserStore();
  const { chatId } = useChatStore();
  return (
    <div className="my-6 sm:mb-0 w-[98vw] sm:w-[90vw] sm:h-[90vh] flex flex-col sm:flex-row bg-[#111928bf] rounded-lg backdrop-blur-xl backdrop-saturate-150 border-black border-opacity-10">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default Body;
