import { db } from "../../library/firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useUserStore } from "../../library/userStore";

const AddUser = () => {
  const [user, setUser] = useState(null);

  const { currentUser } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");

      const q = query(userRef, where("username", "==", username));

      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-7 m-auto w-max h-max flex flex-col gap-4 bg-[#111928] rounded-lg absolute top-0 right-0 bottom-0 left-0">
      <form className=" flex gap-2 " onSubmit={handleSearch}>
        <input
          className="p-2 text-black rounded-lg border-none outline-none"
          type="search"
          name="username"
          placeholder="Username"
        />
        <button className="px-3 bg-[#1a73e8] text-white border-none cursor-pointer rounded-lg ">
          Search
        </button>
      </form>
      {user && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={user.avatar || "./avatar.png"}
              alt=""
            />
            <span>{user.username}</span>
          </div>
          <button
            className="px-3 py-1 bg-[#1a73e8] text-white border-none cursor-pointer rounded-lg"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default AddUser;

