// import "./ProfileCard.css"
import { useSelector, useDispatch } from "react-redux";
import ProfileForm from "./ProfileForm";
import ProfileImage from "./ProfileImage";

const ProfileCard = () => {
  const {
    isGettingUserLoading,
    isGettingUserError,
    isGettingUserErrorMessage,
    user,
  } = useSelector((state) => state.user);

  if (isGettingUserLoading || !user)
    return (
      <div className="Loading-div">
        <p>Loading ... </p>
      </div>
    );
  else
    return (
      <div className="ProfileCard section-2-div" id ="ProfileCard-component">
        <ProfileImage />
        <ProfileForm />
      </div>
    );
};

export default ProfileCard;
