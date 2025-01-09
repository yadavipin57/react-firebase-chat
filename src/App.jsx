import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./library/firebase";
import { useUserStore } from "./library/userStore";
import { useChatStore } from "./library/chatStore";

const App = () => {

  const {currentUser, isLoading, fetchUserInfo} = useUserStore();
  const {chatId} = useChatStore();

  useEffect(() => {
    // When using real time data then its important to use cleaup function
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => unSub;
  }, [fetchUserInfo]);

  if(isLoading) return <div className="p-[50px] text-4xl rounded-lg bg-[#111928e6] ">Loading...</div>

  return (
    <div className="sm:mt-0 sm:mb-0 w-[90vw] sm:h-[90vh] flex flex-col sm:flex-row bg-[#111928bf] rounded-lg backdrop-blur-xl backdrop-saturate-150 border-black border-opacity-10">
      {currentUser ? (
        <>
          <List/>
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

export default App;
