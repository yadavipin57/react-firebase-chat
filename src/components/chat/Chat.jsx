import EmojiPicker from "emoji-picker-react";
import { useCallback, useEffect, useRef, useState } from "react";
import "./Chat.css";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../library/firebase";
import { useChatStore } from "../../library/chatStore";
import { useUserStore } from "../../library/userStore";
import upload from "../../library/upload";
import { format } from "timeago.js";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  // const navigate = useNavigate();

  const { currentUser } = useUserStore();
  const { chatId, user, selectedUserId, isCurrentUserBlocked, isRecieverBlocked } =
    useChatStore();

  const navigate = useNavigate();

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (response) => {
      setChat(response.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleSend = async () => {
    if (text === "") return;

    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id, user.id];
      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );
          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }

    setText(""),
      setImg({
        file: null,
        url: "",
      });
  };

  const handleImage = (e) => {
    // This gives an event
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleVideoCall = useCallback(()=>{
    navigate(`video-call/${selectedUserId}`)
  }, [])

  return (
    <div className="h-[100%] flex flex-col flex-[2] border-[#dddddd35] -[1px]">
      {/* TOP  */}
      <div>{selectedUserId}</div>
      <div className="p-5 flex items-center justify-between border-[#dddddd35] border-b-[1px]">
        <div className="flex items-center gap-5">
          <img
            className="w-8 h-8 sm:w-[60px] sm:h-[60px] rounded-full object-cover "
            src={user?.avatar || "./avatar.png"}
          />
          <div className="flex flex-col gap-1">
            <span className="text-sm sm:text-[18px] font-bold">
              {user.username}
            </span>
            <p className="text-[12px] sm:text-[14px] text-[#a5a5a5]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
        <div className="hidden sm:flex flex-col sm:flex-row gap-3">
          <img className="w-4 h-4 cursor-pointer" src="./phone.png" />
          <img className="w-4 h-4 cursor-pointer" onClick={handleVideoCall} src="./video.png" />
          <img className="w-4 h-4 cursor-pointer" src="./info.png" />
        </div>
      </div>

      {/* CENTER  */}
      <div className="p-5 flex flex-col gap-5 overflow-y-scroll flex-1 ">
        {chat?.messages?.map((message) => {
          return (
            <div
              className={`max-w-[80%] flex gap-5 ${
                message.senderId.id === currentUser?.id ? "sender" : "reciever"
              }`}
              key={message.createdAt}
            >
              <div className="flex flex-col gap-1 flex-1">
                {message.img && (
                  <img
                    className="self-end cover w-[50%] h-auto cursor-pointer"
                    src={message.img}
                  />
                )}
                <p className="p-2 rounded-lg text-sm">{message.text}</p>
                <span className="text-[10px]">
                  {format(message.createdAt.toDate())}
                </span>
              </div>
            </div>
          );
        })}
        {img.url && (
          <div className="max-w-[80%] flex gap-5 sender">
            <div className="flex flex-col gap-1 flex-1">
              <img
                className="self-end cover w-[50%] h-auto cursor-pointer"
                src={img.url}
                alt=""
              />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>

      {/* BOTTOM  */}
      <div className="p-3 flex gap-2 items-center justify-evenly border-[#dddddd35] border-t-[1px]">
        <div className="hidden sm:flex gap-2">
          <label htmlFor="file">
            <img className="w-5 h-5 cursor-pointer" src="./img.png" />
          </label>
          <input
            className="hidden"
            type="file"
            id="file"
            onChange={handleImage}
          />
          <img className="w-5 h-5 cursor-pointer" src="./camera.png" />
          <img className="w-5 h-5 cursor-pointer" src="./mic.png" />
        </div>
        <input
          className="p-1 text-sm sm:p-2 border-none outline-none bg-[#111928ad] flex-1  rounded-lg disabled:cursor-not-allowed"
          onChange={(e) => setText(e.target.value)}
          value={text}
          type="text"
          placeholder={
            isCurrentUserBlocked || isRecieverBlocked
              ? "You cannot send a message"
              : "Type a message..."
          }
          disabled={isCurrentUserBlocked || isRecieverBlocked}
        />
        <div className="relative">
          <img
            className="w-5 h-5 cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
            src="./emoji.png"
          />
          <div className="absolute bottom-8 left-0">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button
          className="px-1 py-1 text-sm  sm:px-4 sm:py-2 bg-[#5183fe] rounded-lg disabled:bg-[#5182fe87] disabled:cursor-not-allowed"
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isRecieverBlocked}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
