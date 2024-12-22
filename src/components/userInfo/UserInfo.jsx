const UserInfo = ()=>{
    return (
        <div className="p-4 flex gap-16 items-center justify-between">
            <div className="flex gap-3 items-center">
                <img className="w-12 h-12 rounded-full" src="./avatar.png"/>
                <h2>John Doe</h2>
            </div>
            <div className="flex gap-3">
                <img className="w-4 h-4" src="./more.png"/>
                <img className="w-4 h-4" src="./video.png"/>
                <img className="w-4 h-4" src="./edit.png"/>
            </div>
        </div>
    )
}

export default UserInfo;