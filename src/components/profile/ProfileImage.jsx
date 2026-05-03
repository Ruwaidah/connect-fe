import { useState } from "react";
import { useSelector } from "react-redux";

const ProfileImage = ({ setImg, setIsImageChange }) => {
  const { user } = useSelector((state) => state.user);
  const [errorImage, setErrorImage] = useState(null);
  const [imageUpload, setImageUpload] = useState(user?.image || "");

  const imageEdit = (e) => {
    e.preventDefault();
    document.getElementById("image-input")?.click();
  };

  const changeImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const okTypes = ["image/png", "image/jpeg"];
    if (!okTypes.includes(file.type)) {
      setErrorImage("Only PNG or JPEG images");
      return;
    }

    setErrorImage(null);

    setImg(file);
    setIsImageChange(true);

    const reader = new FileReader();
    reader.onload = () => setImageUpload(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-[98%] flex justify-center items-center mt-10">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="rounded-full border border-[#4555ad]/90 w-30 h-30 p-1">
          <img
            src={imageUpload}
            className="rounded-full w-full h-full object-cover"
            alt="Profile"
          />
        </div>
        {errorImage && <p className="text-red-400 text-xs mt-2">{errorImage}</p>}
        <input
          className="hidden"
          type="file"
          id="image-input"
          accept="image/png,image/jpeg"
          onChange={changeImage}
        />
        <button
          type="button"
          className="bg-[#20274d]/70 h-10 text-sm flex items-center mt-4
                     justify-center w-50 rounded-md border border-[#20274d]/50 text-white"
          onClick={imageEdit}
        >
          <span className="ml-1">Change Photo</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileImage;