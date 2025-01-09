import { useUserStore } from "../../library/userStore";

const UserInfo = ()=>{

    const {currentUser} = useUserStore();

    return (
        <div className="mt-[780px] sm:mt-0 p-4 flex items-center justify-between">
            <div className="flex gap-3 items-center">
                <img className="w-8 h-8 sm:w-12 sm:h-12 rounded-full cursor-pointer object-cover" src={currentUser.avatar || "./avatar.png"}/>
                <h2>{currentUser.username}</h2>
            </div>
            <div className="flex gap-3">
                <img className="w-3 h-3 sm:w-4 sm:h-4 cursor-pointer" src="./more.png"/>
                <img className="w-3 h-3 sm:w-4 sm:h-4 cursor-pointer" src="./video.png"/>
                <img className="w-3 h-3 sm:w-4 sm:h-4 cursor-pointer" src="./edit.png"/>
            </div>
        </div>
    )
}

export default UserInfo;