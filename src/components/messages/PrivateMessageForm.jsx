import "./PrivateMessageForm.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { sendMessage } from "../../reducers/messagesSlice";

const PrivateMessageForm = (props) => {
  const dispatch = useDispatch();
  const { user, privateMsg } = useSelector((state) => state.messages);
  const { register, handleSubmit, reset, watch } = useForm();
  const [reSize, setResize] = useState(
    window.screen.width >= 1200
      ? "l"
      : window.screen.width <= 1200 && window.screen.width >= 500
      ? "m"
      : window.screen.width <=  500
      ? "s"
      : "s"
  );

  useEffect(() => {
    const text = document.getElementById("text-area");
    if (text) {
      if (reSize === "l") text.style.height = "34px";
      else if (reSize === "m") text.style.height = "32px";
      // else if (reSize === "m") text.style.height = "30px";
      else text.style.height = "29px";
    }
  }, [reSize]);
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
  addEventListener("resize", (e) => {
    if (window.screen.width >= 1200) setResize("l");
    else if (window.screen.width <= 1200 && window.screen.width >= 500)
      setResize("m");
    else if (window.screen.width <= 500) setResize("s");
    // else setResize("s");
  });
  useEffect(() => {
    const text = document.getElementById("text-area");
    if (text.value) {
      if (
        (reSize === "l" && text.scrollHeight > 34) ||
        (reSize === "m" && text.scrollHeight > 30) ||
        (reSize === "s" && text.scrollHeight > 29)
      ) {
        if (text.style.height !== text.scrollHeight + "px")
          props.setSendMsg(!props.sendMsg);
        text.style.height = text.scrollHeight + "px";
      }
    }
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
            src="./assets/send-text.png"
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
