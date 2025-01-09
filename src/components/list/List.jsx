import ChatList from "../chatList/ChatList"
import UserInfo from "../userInfo/UserInfo"

const List = ()=>{
    return (
        <div className="sm:mt-0 flex flex-col flex-1">
            <UserInfo/>
            <ChatList/>
        </div>
    )
}

export default List