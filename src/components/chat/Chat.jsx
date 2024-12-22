import EmojiPicker from "emoji-picker-react"
import { useState } from "react"

const Chat = ()=>{

    const [open, setOpen] = useState(false);

    const handleEmoji = (e)=>{
        console.log(e.emoji);
    }

    return (
        <div className="h-[100%] flex-[2] border-[#dddddd35] border-x-[1px]">
            {/* TOP  */}
            <div className="p-5 flex items-center justify-between border-[#dddddd35] border-b-[1px] border-r-[1px]">
                <div className="flex items-center gap-5">
                    <img className="w-[60px] h-[60px] rounded-full cover " src="./avatar.png" />
                    <div className="flex flex-col gap-1">
                        <span className="text-[18px] font-bold">Jane Doe</span>
                        <p className="text-[14px] text-[#a5a5a5]">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                </div>
                <div className="flex flex-row gap-3">
                    <img className="w-4 h-4" src="./phone.png" />
                    <img className="w-4 h-4" src="./video.png" />
                    <img className="w-4 h-4" src="./info.png" />
                </div>
            </div>

            {/* CENTER  */}
            <div></div>

            {/* BOTTOM  */}
            <div className="p-3 flex gap-2 items-center justify-evenly border-[#dddddd35] border-t-[1px]">
                <div className="flex gap-2">
                    <img className="w-5 h-5 cursor-pointer" src="./img.png"/>
                    <img className="w-5 h-5 cursor-pointer" src="./camera.png"/>
                    <img className="w-5 h-5 cursor-pointer" src="./mic.png"/>
                </div>
                <input className="p-2 border-none outline-none bg-[#111928ad] flex-1  rounded-lg" type="text" placeholder="Type a message..." />
                <div>
                    <img className="w-5 h-5 cursor-pointer" onClick={()=>setOpen((prev)=>!prev)} src="./emoji.png"/>
                    <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
                </div>
                <button className="px-4 py-2 bg-[#5183fe] rounded-lg">Send</button>
            </div>
        </div>
    )
}

export default Chat