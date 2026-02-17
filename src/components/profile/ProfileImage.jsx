import { useState } from "react";
import { useSelector } from "react-redux";

const ProfileImage = (props) => {
  const { user } = useSelector((state) => state.user);
  const [errorImage, setErrorImage] = useState(null);
  const [imageUpload, setImageUpload] = useState(user.image);


  const imageEdite = (e) => {
    e.preventDefault();
    document.getElementById("image-input").click();
  };

  const changeImage = (e) => {
    const image = e.target.files[0];
    if (image && (image.type == "image/png" || image.type == "image/jpeg")) {
      setErrorImage(null);
      if (image) {
        const formdata = new FormData();
        formdata.append("image", image, image.name);
        props.setImg(formdata)
        props.setIsImageChange(true);
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = function (e) {
          setImageUpload(reader.result);
        }.bind(reader);
        setImageUpload
      }
    } else {
      setErrorImage("Only Image");
    }
  };


  return (
    <div className="w-[98%] flex justify-center items-center">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="rounded-full border border-[#4555ad]/90 w-30 h-30 p-1">
          <img src={imageUpload} className="rounded-full w-full h-full object-cover" />
          {errorImage && <p className="text-red-400 text-xs mt-2">{errorImage}</p>}
          <input
            className="hidden"
            type="file"
            id="image-input"
            accept="image/png,image/jpeg"
            onChange={changeImage}
          />
        </div>
        <button
          type="button"
          className="bg-[#20274d]/70 h-10 text-sm flex items-center mt-4
                   justify-center w-50 rounded-md border border-[#20274d]/50 text-white"
          onClick={imageEdite}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.46814 17.5319C5.62291 19.7154 7.92876 20.5 12 20.5C17.6255 20.5 19.8804 19.002 20.3853 14.3853M4.46814 17.5319C3.77924 16.2292 3.5 14.4288 3.5 12C3.5 5.5 5.5 3.5 12 3.5C18.5 3.5 20.5 5.5 20.5 12C20.5 12.8745 20.4638 13.6676 20.3853 14.3853M4.46814 17.5319L7.58579 14.4142C8.36684 13.6332 9.63317 13.6332 10.4142 14.4142L10.5858 14.5858C11.3668 15.3668 12.6332 15.3668 13.4142 14.5858L15.5858 12.4142C16.3668 11.6332 17.6332 11.6332 18.4142 12.4142L20.3853 14.3853M10.691 8.846C10.691 9.865 9.864 10.692 8.845 10.692C7.827 10.692 7 9.865 7 8.846C7 7.827 7.827 7 8.845 7C9.864 7 10.691 7.827 10.691 8.846Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          <span className="ml-1">Change Photo</span>
        </button>
      </div>
    </div>
  );

};

export default ProfileImage;
