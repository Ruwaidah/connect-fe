import "./PrivateMessageForm.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { sendMessage } from "../../reducers/messagesSlice";

const PrivateMessageForm = (props) => {
  const dispatch = useDispatch();
  const { user, privateMsg } = useSelector((state) => state.messages);
  const { register, handleSubmit, reset, watch } = useForm();

  const submitBtn = (e) => {
    e.preventDefault();
    document.getElementById("texting-submit").click();
  };

  const onSubmit = (data) => {
    dispatch(
      sendMessage({
        data: {
          senderId: localStorage.getItem("id"),
          receiverId: privateMsg.friend.id,
          text: data.msg,
        },
        sender: user,
      })
    );

    reset();
  };
  useEffect(() => {
    const text = document.getElementById("text-area");
    if (text.scrollHeight > 36 && text.value) {
      if (text.style.height !== text.scrollHeight + "px")
        props.setSendMsg(!props.sendMsg);
      text.style.height = text.scrollHeight + "px";
    } else text.style.height = "32px";
  }, [watch("msg")]);

  return (
    <div className="PrivateMsgForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="textarea-div">
          <textarea
            id="text-area"
            type="text"
            rows={1}
            {...register("msg", {
              required: {
                value: true,
                message: "require",
              },
              maxLength: {
                value: 100,
                message: "Message too long",
              },
            })}
          />
          <img
            src="../src/assets/send-text.png"
            type="submit"
            onClick={submitBtn}
          />
          <input type="submit" value="send" id="texting-submit" />
        </div>
      </form>
    </div>
  );
};

export default PrivateMessageForm;
