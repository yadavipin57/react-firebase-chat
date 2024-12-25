import { useEffect, useState } from "react";
import AddUser from "../addUser/AddUser";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../library/firebase";
import { useUserStore } from "../../library/userStore";
import { useChatStore } from "../../library/chatStore";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [userSearch, setUserSearch] = useState("");

  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (response) => {
        const items = response.data().chats;

        const promises = items.map(async (items) => {
          const userDocRef = doc(db, "users", items.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...items, user };
        });

        const chatData = await Promise.all(promises);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => unSub();
  }, [currentUser.id]);

  const handleSelect = async (chat) => {

    const userChats = chats.map((item)=>{
      const {user, ...rest} = item; 
      return rest;
    })

    const chatIndex = userChats.findIndex((item)=>item.chatId === chat.chatId)

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", currentUser.id);

    try{
      await updateDoc(userChatsRef, {
        chats: userChats,
      })
      changeChat(chat.chatId, chat.user);
    } catch(error){
      console.log(error);
    }

  };

  const filteredChats = chats.filter((c)=>{
    c.user.username.toLowerCase().includes(userSearch.toLowerCase());
  })

  return (
    <div className="px-2 flex-1 overflow-y-scroll">
      <div className="px-1 flex items-center justify-evenly bg-[#111928ad]  rounded-lg">
        <div className="flex items-center flex-1">
          <img className="p-2 w-8 h-8" src="./search.png" />
          <input
            className="p-2  flex-1 border-none outline-none bg-transparent"
            type="text"
            placeholder="Search..."
            onChange={(e)=>setUserSearch(e.target.value)}
          />
        </div>
        <img
          className="p-2 w-8 h-8 bg-[#111928fa] hover:bg-[#11192811] rounded-lg cursor-pointer"
          src={addMode ? "./minus.png" : "./plus.png"}
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>

      {/* {chats.map((chat) => {  --------> Earlier we used this*/} 
      {filteredChats.map((chat) => {
        return (
          <div
            className={`p-5 flex items-center gap-5 cursor-pointer border-[#dddddd35] ${
              chat?.isSeen ? "bg-transparent" : "bg-[#5183fe]"
            }`}
            key={chat.chatId}
            onClick={() => handleSelect(chat)}
          >
            <img
              className="w-14 h-14 rounded-full object-cover "
              src={chat.user.blocked.includes(currentUser.id)? "./avatar.png" : chat.user.avatar || "./avatar.png"}
            />
            <div className="flex flex-col">
              <span className="text-[18px] font-bold">
                {chat.user.blocked.includes(currentUser.id) ? "User" : chat.user.username}
              </span>
              <p className="text-[14px]">{chat.lastMessage}</p>
            </div>
          </div>
        );
      })}

      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
