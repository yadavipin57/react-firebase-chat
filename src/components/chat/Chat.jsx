import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import "./Chat.css";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  return (
    <div className="h-[100%] flex flex-col flex-[2] border-[#dddddd35] -[1px]">
      {/* TOP  */}
      <div className="p-5 flex items-center justify-between border-[#dddddd35] border-b-[1px] border-r-[1px]">
        <div className="flex items-center gap-5">
          <img
            className="w-[60px] h-[60px] rounded-full cover "
            src="./avatar.png"
          />
          <div className="flex flex-col gap-1">
            <span className="text-[18px] font-bold">Jane Doe</span>
            <p className="text-[14px] text-[#a5a5a5]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <img className="w-4 h-4" src="./phone.png" />
          <img className="w-4 h-4" src="./video.png" />
          <img className="w-4 h-4" src="./info.png" />
        </div>
      </div>

      {/* CENTER  */}
      <div className="p-5 flex flex-col gap-5 overflow-y-scroll flex-1 ">
        <div className="max-w-[80%] flex gap-5 own">
          <div className="flex flex-col gap-1 flex-1">
            <img
              className="self-end cover w-[50%] h-auto cursor-pointer"
              src="https://images.pexels.com/photos/29874884/pexels-photo-29874884/free-photo-of-australian-shepherd-by-christmas-tree.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <p className="p-2 rounded-lg text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia
              natus quaerat reprehenderit architecto iusto animi ea, quasi
              voluptatibus. Ab laudantium voluptatem consequuntur vitae quaerat
              animi.
            </p>
            <span className="text-[10px]">1 min agon</span>
          </div>
        </div>
        <div className="max-w-[80%] flex gap-5">
          <img className="w-10 h-10 rounded-full cover" src="./avatar.png" />
          <div className="flex flex-col gap-1 flex-1 ">
            <p className="p-2 rounded-lg text-sm bg-[#1119284d]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia
              natus quaerat reprehenderit architecto iusto animi ea, quasi
              voluptatibus. Ab laudantium voluptatem consequuntur vitae quaerat
              animi.
            </p>
            <span className="text-[10px]">1 min agon</span>
          </div>
        </div>

        <div className="max-w-[80%] flex gap-5 own">
          <div className="flex flex-col gap-1 flex-1">
            <p className="p-2 rounded-lg text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia
              natus quaerat reprehenderit architecto iusto animi ea, quasi
              voluptatibus. Ab laudantium voluptatem consequuntur vitae quaerat
              animi.
            </p>
            <span className="text-[10px]">1 min agon</span>
          </div>
        </div>
        <div className="max-w-[80%] flex gap-5">
          <img className="w-10 h-10 rounded-full cover" src="./avatar.png" />
          <div className="flex flex-col gap-1 flex-1 ">
            <p className="p-2 rounded-lg text-sm bg-[#1119284d]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia
              natus quaerat reprehenderit architecto iusto animi ea, quasi
              voluptatibus. Ab laudantium voluptatem consequuntur vitae quaerat
              animi.
            </p>
            <span className="text-[10px]">1 min agon</span>
          </div>
        </div>

        <div className="max-w-[80%] flex gap-5 own">
          <div className="flex flex-col gap-1 flex-1">
            <p className="p-2 rounded-lg text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia
              natus quaerat reprehenderit architecto iusto animi ea, quasi
              voluptatibus. Ab laudantium voluptatem consequuntur vitae quaerat
              animi.
            </p>
            <span className="text-[10px]">1 min agon</span>
          </div>
        </div>
        <div className="max-w-[80%] flex gap-5">
          <img className="w-10 h-10 rounded-full cover" src="./avatar.png" />
          <div className="flex flex-col gap-1 flex-1 ">
            <p className="p-2 rounded-lg text-sm bg-[#1119284d]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia
              natus quaerat reprehenderit architecto iusto animi ea, quasi
              voluptatibus. Ab laudantium voluptatem consequuntur vitae quaerat
              animi.
            </p>
            <span className="text-[10px]">1 min agon</span>
          </div>
        </div>

        <div className="max-w-[80%] flex gap-5 own">
          <div className="flex flex-col gap-1 flex-1">
            <p className="p-2 rounded-lg text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia
              natus quaerat reprehenderit architecto iusto animi ea, quasi
              voluptatibus. Ab laudantium voluptatem consequuntur vitae quaerat
              animi.
            </p>
            <span className="text-[10px]">1 min agon</span>
          </div>
        </div>
        <div className="max-w-[80%] flex gap-5">
          <img className="w-10 h-10 rounded-full cover" src="./avatar.png" />
          <div className="flex flex-col gap-1 flex-1 ">
            <img
              className="self-start cover w-[50%] h-auto cursor-pointer"
              src="https://images.pexels.com/photos/29874884/pexels-photo-29874884/free-photo-of-australian-shepherd-by-christmas-tree.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <p className="p-2 rounded-lg text-sm bg-[#1119284d]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia
              natus quaerat reprehenderit architecto iusto animi ea, quasi
              voluptatibus. Ab laudantium voluptatem consequuntur vitae quaerat
              animi.
            </p>
            <span className="text-[10px]">1 min agon</span>
          </div>
        </div>

        <div className="max-w-[80%] flex gap-5 own">
          <div className="flex flex-col gap-1 flex-1">
            <img
              className="self-end cover w-[50%] h-auto cursor-pointer"
              src="https://images.pexels.com/photos/29874884/pexels-photo-29874884/free-photo-of-australian-shepherd-by-christmas-tree.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <p className="p-2 rounded-lg text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia
              natus quaerat reprehenderit architecto iusto animi ea, quasi
              voluptatibus. Ab laudantium voluptatem consequuntur vitae quaerat
              animi.
            </p>
            <span className="text-[10px]">1 min agon</span>
          </div>
        </div>
        <div className="max-w-[80%] flex gap-5">
          <img className="w-10 h-10 rounded-full cover" src="./avatar.png" />
          <div className="flex flex-col gap-1 flex-1 ">
            <p className="p-2 rounded-lg text-sm bg-[#1119284d]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia
              natus quaerat reprehenderit architecto iusto animi ea, quasi
              voluptatibus. Ab laudantium voluptatem consequuntur vitae quaerat
              animi.
            </p>
            <span className="text-[10px]">1 min agon</span>
          </div>
        </div>
      </div>

      {/* BOTTOM  */}
      <div className="p-3 flex gap-2 items-center justify-evenly border-[#dddddd35] border-t-[1px]">
        <div className="flex gap-2">
          <img className="w-5 h-5 cursor-pointer" src="./img.png" />
          <img className="w-5 h-5 cursor-pointer" src="./camera.png" />
          <img className="w-5 h-5 cursor-pointer" src="./mic.png" />
        </div>
        <input
          className="p-2 border-none outline-none bg-[#111928ad] flex-1  rounded-lg"
          onChange={(e) => setText(e.target.value)}
          value={text}
          type="text"
          placeholder="Type a message..."
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
        <button className="px-4 py-2 bg-[#5183fe] rounded-lg">Send</button>
      </div>
    </div>
  );
};

export default Chat;
