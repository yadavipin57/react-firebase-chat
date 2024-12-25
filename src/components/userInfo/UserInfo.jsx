import { useUserStore } from "../../library/userStore";

const UserInfo = ()=>{

    const {currentUser} = useUserStore();

    return (
        <div className="p-4 flex gap-16 items-center justify-between">
            <div className="flex gap-3 items-center">
                <img className="w-12 h-12 rounded-full cursor-pointer object-cover" src={currentUser.avatar || "./avatar.png"}/>
                <h2>{currentUser.username}</h2>
            </div>
            <div className="flex gap-3">
                <img className="w-4 h-4 cursor-pointer" src="./more.png"/>
                <img className="w-4 h-4 cursor-pointer" src="./video.png"/>
                <img className="w-4 h-4 cursor-pointer" src="./edit.png"/>
            </div>
        </div>
    )
}

export default UserInfo;