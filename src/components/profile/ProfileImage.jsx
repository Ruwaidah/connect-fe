import "./ProfileImage.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { changeUserImage } from "../../reducers/usersSlice";

const ProfileImage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [errorImage, setErrorImage] = useState(null);
  const [isImageChange, setIsImageChange] = useState(false);
  const [imageUpload, setImageUpload] = useState(user.image);
  const [img, setImg] = useState();
  const { register, formState, handleSubmit, reset } = useForm();

  const imageEdite = (e) => {
    e.preventDefault();
    document.getElementById("image-input").click();
  };
  const { errors } = formState;

  const changeImage = (e) => {
    const image = e.target.files[0];
    if (image && (image.type == "image/png" || image.type == "image/jpeg")) {
      setErrorImage(null);
      setImg(image);
      if (image) {
        setIsImageChange(true);
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = function (e) {
          setImageUpload(reader.result);
        }.bind(reader);
      }
    } else {
      setErrorImage("Only Image");
    }
  };

  const imageSubmit = () => {
    const formdata = new FormData();
    formdata.append("image", img, img.name);
    setIsImageChange(false);
    dispatch(
      changeUserImage({
        image: formdata,
        imageId: user.image_id,
        publicImageId: user.public_id,
      })
    );
  };

  const cancelImageChange = () => {
    console.log("wfwfwfw");
    setIsImageChange(false);
    setImageUpload(user.image);
    reset();
  };

  return (
    <div className="ImageProfile">
      <form className="image-form" onSubmit={handleSubmit(imageSubmit)}>
        <div className="img-edit-div">
          <img src={imageUpload} width="100px" />
          <p>{errorImage}</p>

          <input
            type="file"
            id="image-input"
            accept="image/*"
            {...register("image")}
            onChange={changeImage}
          />
          <button className="edit-btn" onClick={imageEdite}>
            Edite
          </button>
        </div>
        <div className="submit-cancel-btns">
          {" "}
          {isImageChange && (
            <>
              {" "}
              <input type="submit" value="Save Image" />{" "}
              <button onClick={cancelImageChange}>Cancel</button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileImage;
