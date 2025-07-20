import "./ProfileForm.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { checkUsername } from "../../reducers/usersSlice";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const [isEditProfile, setIsEditProfile] = useState(false);
  const { user, isUsernameAvailable } = useSelector((state) => state.user);
  const { register, handleSubmit, formState, reset, watch } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      bio: user.bio ? user.bio : "No Status",
    },
  });
  const { errors, isDirty } = formState;

  useEffect(() => {
    if (user.username !== watch("username"))
      dispatch(checkUsername({ username: watch("username") }));
  }, [watch("username")]);

  const editProfile = () => setIsEditProfile(true);

  const cancelEditProfile = () => {
    reset();
    setIsEditProfile(false);
  };

  const onSubmit = (data) => {
    setIsEditProfile(false);
    if (isDirty) {
      dispatch(updateUser(data));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
      <p className="error-para">
        {errors
          ? errors.firstName
            ? errors.firstName.message
            : errors.lastName
            ? errors.lastName.message
            : errors.username
            ? errors.username.message
            : null
          : isUsernameAvailable}
      </p>
      <div className="first-last-name-div">
        <div className="name-div input-div">
          <p>First Name</p>
          <input
            type="text"
            className={errors && errors.firstName ? "error-input " : null}
            disabled={isEditProfile ? "" : "disabled"}
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
        <div className="name-div input-div">
          <p>Last Name</p>
          <input
            className={errors && errors.lastName ? "error-input " : null}
            type="text"
            disabled={isEditProfile ? "" : "disabled"}
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
      <div className="username-status-div">
        <div className="status-div input-div">
          <p>Status</p>
          <input
            className={errors && errors.bio ? "error-input " : null}
            disabled={isEditProfile ? "" : "disabled"}
            type="text"
            {...register("bio", {
              maxLength: {
                value: 100,
                message: "Too Long",
              },
            })}
          />
        </div>
        <div className="profile-username-div input-div">
          <p>Username</p>
          <input
            type="text"
            className={errors && errors.username ? "error-input " : null}
            disabled={isEditProfile ? "" : "disabled"}
            {...register("username", {
              required: {
                value: true,
                message: "Require",
              },
              pattern: {
                value: /(^([a-zA-Z]){1,})(\d{1,})?(_)?([a-z|A-Z|0-9])$/,

                message: "Invaild Username",
              },
              maxLength: {
                value: 10,
                message: "Username is too Long",
              },
              minLength: {
                value: 4,
                message: "Username is too Short",
              },
            })}
          />
        </div>
      </div>
      {isEditProfile ? (
        <div className="submit-cancel-btn input-div">
          <div>
            {" "}
            <input type="submit" value="Save" />
          </div>
          <div>
            <button className="cancel-btn" onClick={cancelEditProfile}>
              Cancel
            </button>
          </div>{" "}
        </div>
      ) : (
        <div className="submit-edit-btn">
          <button className="btn-edit-profile" onClick={editProfile}>
            {" "}
            Edit
          </button>
        </div>
      )}
    </form>
  );
};

export default ProfileForm;
