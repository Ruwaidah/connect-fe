import { useEffect } from "react";
import { socket } from "../../socket";
import { useDispatch } from "react-redux";
import { receivedMsg } from "../../reducers/messagesSlice";



const NewNotification = () => {
  const dispatch = useDispatch()
  // ************************************* MESSAGE RECEIVE *************************************
  useEffect(() => {
    socket.on("MESSAGE_RECEIVE", (data) => {
      console.log(data)
      console.log(window.location.hash == `#/messages/${data.friend.id}`);
      //   if (window.location.hash == `#/messages/${data.friend.id}`) {
      //     dispatch(
      //       messageRead({
      //         numberOfMsgUnread: data.numberOfMsgUnread,
      //         data: {
      //           userId: localStorage.getItem("id"),
      //           friendId: data.friend.id,
      //         },
      //       })
      //     );
      //   }
      dispatch(receivedMsg(data));
    });
  }, []);
  return <div className="NewNotification"></div>;
};

export default NewNotification;
