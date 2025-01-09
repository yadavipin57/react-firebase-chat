import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../library/chatStore";
import { auth, db } from "../../library/firebase";
import { useUserStore } from "../../library/userStore";
import { useEffect, useState } from "react";

const Detail = () => {
  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isRecieverBlocked, changeBlock } =
  useChatStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isRecieverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex-1 overflow-y-scroll">
      <div className="mt-2 flex flex-col justify-evenly items-center gap-2 border-[#dddddd35] border-b-[1px]">
        <img
          className="w-[80px] h-[80px] rounded-full object-cover"
          src={user.avatar || "./avatar.png"}
          alt=""
        />
        <h2>{user.username}</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      <div className="p-3 flex flex-col gap-2">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Chat Setting</span>
            <img
              className="p-2 w-7 h-7 bg-[#1119284d] rounded-full cursor-pointer"
              src="./arrowUp.png"
              alt=""
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Privacy & help</span>
            <img
              className="p-2 w-7 h-7 bg-[#1119284d] rounded-full cursor-pointer"
              src="./arrowUp.png"
              alt=""
            />
          </div>
        </div>

        {/* SHARED PHOTOS  */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span>Shared Photos</span>
            <img
              className="p-2 w-7 h-7 bg-[#1119284d] rounded-full cursor-pointer"
              src="./arrowDown.png"
              alt=""
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 ">
                <img
                  className="w-10 h-10 rounded-lg cursor-pointer"
                  src="https://images.pexels.com/photos/29874884/pexels-photo-29874884/free-photo-of-australian-shepherd-by-christmas-tree.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
                <span className="text-gray-300 text-sm">photo_2024_2.png</span>
              </div>
            </div>
            <img
              className="p-2 w-7 h-7 bg-[#1119284d] rounded-full cursor-pointer"
              src="./download.png"
              alt=""
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 ">
                <img
                  className="w-10 h-10 rounded-lg cursor-pointer"
                  src="https://images.pexels.com/photos/29874884/pexels-photo-29874884/free-photo-of-australian-shepherd-by-christmas-tree.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
                <span className="text-gray-300 text-sm">photo_2024_2.png</span>
              </div>
            </div>
            <img
              className="p-2 w-7 h-7 bg-[#1119284d] rounded-full cursor-pointer"
              src="./download.png"
              alt=""
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 ">
                <img
                  className="w-10 h-10 rounded-lg cursor-pointer"
                  src="https://images.pexels.com/photos/29874884/pexels-photo-29874884/free-photo-of-australian-shepherd-by-christmas-tree.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
                <span className="text-gray-300 text-sm">photo_2024_2.png</span>
              </div>
            </div>
            <img
              className="p-2 w-7 h-7 bg-[#1119284d] rounded-full cursor-pointer"
              src="./download.png"
              alt=""
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 ">
                <img
                  className="w-10 h-10 rounded-lg cursor-pointer"
                  src="https://images.pexels.com/photos/29874884/pexels-photo-29874884/free-photo-of-australian-shepherd-by-christmas-tree.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
                <span className="text-gray-300 text-sm">photo_2024_2.png</span>
              </div>
            </div>
            <img
              className="p-2 w-7 h-7 bg-[#1119284d] rounded-full cursor-pointer"
              src="./download.png"
              alt=""
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 ">
                <img
                  className="w-10 h-10 rounded-lg cursor-pointer"
                  src="https://images.pexels.com/photos/29874884/pexels-photo-29874884/free-photo-of-australian-shepherd-by-christmas-tree.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
                <span className="text-gray-300 text-sm">photo_2024_2.png</span>
              </div>
            </div>
            <img
              className="p-2 w-7 h-7 bg-[#1119284d] rounded-full cursor-pointer"
              src="./download.png"
              alt=""
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <span>Shared Files</span>
            <img
              className="p-2 w-7 h-7 bg-[#1119284d] rounded-full cursor-pointer"
              src="./arrowUp.png"
              alt=""
            />
          </div>
        </div>
        <button
          className="px-6 py-3 bg-[#e64a6988] hover:bg-[#913131] rounded-md text-sm "
          onClick={handleBlock}
        >
          {isCurrentUserBlocked
            ? "You are blocked"
            : isRecieverBlocked
            ? "User is blocked"
            : "Block User"}
        </button>
        <button
          className="px-6 py-3 bg-[#1a73ea] hover:bg-[#1a5feae6] rounded-md text-sm "
          onClick={() => auth.signOut()}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Detail;
