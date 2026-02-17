import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends, startNewChatList } from "../../reducers/usersSlice";
import Loading from "../loading/Loading";
import { NavLink } from "react-router-dom";
import SearchFriendForm from "../friends/SearchFriendForm";


const StartNewChat = () => {
    const dispatch = useDispatch();
    const {
        user,
        isStartNewChat,
        isGetFriendsLoading,
        friendsList,
    } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getFriends())
    }, [])

    const searchNewChat = () => {
        dispatch(startNewChatList(!isStartNewChat));
        dispatch(getFriends());
    };

    if (isGetFriendsLoading) return <Loading />
    return <div className="w-full text-white flex flex-col h-full">
        <div className="flex flex-col items-center justify-between p-2 pt-4 pb-3  
                      border border-b-white/10">
            <div className="flex justify-between items-center w-full  mb-4">
                <div className="flex items-center">
                    <img src="./assets/connect-logo03.png"
                        className="w-8 w-8 mr-4" />
                    <h2 className="font-bold text-lg">Chats</h2>
                </div>
                <NavLink to="/profile">
                    <img src={user && user.image ? user.image : null}
                        className="w-8 h-8 rounded-full" onClick={searchNewChat} />
                </NavLink>
            </div>
            <SearchFriendForm />
        </div>
        {friendsList.length < 1 ?
            <div className="h-full flex justify-center items-center">
                <div className="flex flex-col h-full justify-center items-center">
                    <div className="flex flex-col items-center">
                        <img src="./assets/nomessage.png"
                            className="w-30 h-30" />
                        <h2 className="text-xl py-4">No friends found</h2>
                        <p className="text-xs pb-4">Invite your friends to start chatting</p>
                        <NavLink
                            className="bg-[#3261d5] py-2 px-10 m-2 text-sm rounded-lg"
                            to="/addnewfriend">
                            Invite Friends
                        </NavLink>
                    </div>
                </div>
            </div> :
            <div>
            </div>}
    </div>
}

export default StartNewChat