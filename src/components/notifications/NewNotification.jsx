import { useEffect } from "react";
import { socket } from "../../socket";
import { useDispatch } from "react-redux";
import UnderConstruction from "../underConstruction/UnderConstruction";
// import { receivedMsg } from "../../reducers/messagesSlice";



const NewNotification = () => {
  const dispatch = useDispatch()
  // ************************************* MESSAGE RECEIVE *************************************
  useEffect(() => {
    socket.on("MESSAGE_RECEIVE", (data) => {

      //   if (window.location.hash == `#/messages/private/${data.friend.id}`) {
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
      // dispatch(receivedMsg(data));
    });
  }, []);
  return <UnderConstruction imageSrc="/assets/under-construction01.png"/>
};

export default NewNotification;
