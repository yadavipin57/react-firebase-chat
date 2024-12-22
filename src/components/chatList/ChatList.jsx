import { useState } from "react";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);

  return (
    <div className="px-2 flex-1 overflow-y-scroll">
      <div className="px-1 flex items-center justify-evenly bg-[#111928ad]  rounded-lg">
        <div className="flex items-center flex-1">
          <img className="p-2 w-8 h-8" src="./search.png" />
          <input
            className="p-2  flex-1 border-none outline-none bg-transparent"
            type="text"
            placeholder="Search..."
          />
        </div>
        <img
          className="p-2 w-8 h-8 bg-[#111928fa] hover:bg-[#11192811] rounded-lg cursor-pointer"
          src={addMode ? "./minus.png" : "./plus.png"}
          onClick={()=>setAddMode((prev)=>!prev)}
        />
      </div>
      <div className="p-5 flex items-center gap-5 cursor-pointer border-[#dddddd35] border-b-2">
        <img className="w-14 h-14 rounded-full " src="./avatar.png" />
        <div className="flex flex-col">
            <span className="text-[18px] font-bold">Jane Doe</span>
            <p className="text-[14px]">Hello!</p>
        </div>
      </div>
      <div className="p-5 flex items-center gap-5 cursor-pointer border-[#dddddd35] border-b-2">
        <img className="w-14 h-14 rounded-full " src="./avatar.png" />
        <div className="flex flex-col">
            <span className="text-[18px] font-bold">Jane Doe</span>
            <p className="text-[14px]">Hello!</p>
        </div>
      </div>
      <div className="p-5 flex items-center gap-5 cursor-pointer border-[#dddddd35] border-b-2">
        <img className="w-14 h-14 rounded-full " src="./avatar.png" />
        <div className="flex flex-col">
            <span className="text-[18px] font-bold">Jane Doe</span>
            <p className="text-[14px]">Hello!</p>
        </div>
      </div>
      <div className="p-5 flex items-center gap-5 cursor-pointer border-[#dddddd35] border-b-2">
        <img className="w-14 h-14 rounded-full " src="./avatar.png" />
        <div className="flex flex-col">
            <span className="text-[18px] font-bold">Jane Doe</span>
            <p className="text-[14px]">Hello!</p>
        </div>
      </div>
      <div className="p-5 flex items-center gap-5 cursor-pointer border-[#dddddd35] border-b-2">
        <img className="w-14 h-14 rounded-full " src="./avatar.png" />
        <div className="flex flex-col">
            <span className="text-[18px] font-bold">Jane Doe</span>
            <p className="text-[14px]">Hello!</p>
        </div>
      </div>
      
    </div>
  );
};

export default ChatList;
