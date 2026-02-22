import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../reducers/usersSlice";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { checkUsername } from "../../reducers/usersSlice";
import ProfileImage from "./ProfileImage";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user,
    isUsernameAvailable,
    isGettingUserLoading,
  } = useSelector((state) => state.user);
  const [img, setImg] = useState();
  const [isImageChange, setIsImageChange] = useState(false);
  const { register, handleSubmit, formState, reset, watch } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      bio: "",
    },
  });
  const { errors, isDirty } = formState;

  const inputBase =
    "w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 " +
    "bg-white/[0.06] backdrop-blur-md border focus:outline-none transition";

  const inputOk =
    "border-sky-300/30 shadow-[0_0_0_1px_rgba(110,200,255,0.25),0_0_18px_rgba(60,160,255,0.18),inset_0_0_18px_rgba(120,220,255,0.10)] " +
    "focus:border-sky-200/60 focus:shadow-[0_0_0_1px_rgba(140,230,255,0.45),0_0_24px_rgba(60,170,255,0.28),0_0_70px_rgba(60,140,255,0.14),inset_0_0_18px_rgba(150,240,255,0.12)]";

  const inputErr =
    "border-rose-400/50 text-rose-100 shadow-[0_0_0_1px_rgba(255,90,95,0.45),0_0_12px_rgba(255,90,95,0.28),0_0_28px_rgba(255,90,95,0.18)]";


  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        bio: user.bio || "",
      });
    }
  }, [user, reset]);

  const usernameValue = watch("username");

  useEffect(() => {
    if (!user) return;
  }, [dispatch, user]);

  const onSubmit = (data) => {
    console.log(data)
    const fd = new FormData();
    fd.append("firstName", data.firstName || "");
    fd.append("lastName", data.lastName || "");
    fd.append("bio", data.bio || "");
    if (isImageChange && img) {
      fd.append("image", img);
      fd.append("public_id", user.public_id);
      fd.append("image_id", user.image_id)
    }

    console.log(fd)
    dispatch(updateUser(fd));
  };

  console.log(user)

  if (isGettingUserLoading || !user)
    return <Loading />
  else
    return (
      <div className="flex flex-col w-full justify-start items-center h-full text-white">
        <div className="h-20 w-full text-center flex items-center justify-center">
          <div className="fixed left-2">
            <svg
              onClick={() => navigate(-1)}
              width="18" height="18"
              viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ffffff"><g id="SVGRepo_bgCarrier"
                strokeWidth="0"></g><g id="SVGRepo_tracerCarrier"
                  strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 7L10 12L15 17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          </div> <p>Edit Profile</p>
        </div>
        <ProfileImage
          setImg={setImg}
          img={img}
          setIsImageChange={setIsImageChange} />
        <form onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full justify-center items-center">
          <p className="text-xs mt-2 min-h-5 text-center">
            {errors.firstName?.message ||
              errors.lastName?.message ||
              errors.bio?.message}
          </p>

          <div className="flex flex-col justify-center items-center w-full mt-8">
            <div className="flex flex-col w-[96%]">
              <p className="text-sm">First Name</p>
              <input
                type="text"
                className={`${inputBase} ${errors.firstName ? inputErr : inputOk}`}
                {...register("firstName", {
                  required: {
                    value: true,
                    message: "Require",
                  },
                  maxLength: {
                    value: 10,
                    message: "Too Long",
                  },
                })}
              />
            </div>
            <div className="flex flex-col w-[96%] mt-2">
              <p className="text-sm">Last Name</p>
              <input
                className={`${inputBase} ${errors.lastName ? inputErr : inputOk}`}
                type="text"
                {...register("lastName", {
                  required: {
                    value: true,
                    message: "Require",
                  },
                  maxLength: {
                    value: 10,
                    message: "Too Long",
                  },
                })}
              />
            </div>
          </div>{" "}
          <div className="flex flex-col w-[96%] mt-2">
            <p className="text-sm">Status</p>
            <input
              className={`${inputBase} ${errors.firstName ? inputErr : inputOk}`}
              placeholder="No Status"
              type="text"
              {...register("bio", {
                maxLength: {
                  value: 100,
                  message: "Too Long",
                },
              })}
            />
          </div>
          <button
            // disabled={!isDirty || !isImageChange}
            type="submit"
            className="w-[96%] mt-4 h-11 rounded-xl border border-sky-300/25
                        bg-white/[0.06] backdrop-blur-md text-sm text-white
                        shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_0_18px_rgba(60,170,255,0.12)]
                        hover:border-sky-200/45 hover:bg-white/[0.08]
                        transition active:scale-[0.99]">
            Save Changes
          </button>
        </form>
      </div>
    );
};

export default ProfileForm;
