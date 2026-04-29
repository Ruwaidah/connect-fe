// import "./SearchFriendForm.css";
import { useForm } from "react-hook-form";
import Icon from "../homePage/Auth/formInput/Icon";
import { findNewFriend } from "../../reducers/usersSlice";
import { useDispatch } from "react-redux";

const SearchFriendForm = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState, reset, watch } = useForm();
  const { errors } = formState


  const submitBtn = (e) => {
    e.preventDefault();
    document.getElementById("search-friend-input").click();
  };

  const onSubmit = (data) => {
    dispatch(findNewFriend(data))
  };

  return (
    <div className="w-full px-1">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`mt-1 flex items-center gap-2 rounded-xl 
                                border border-white/10 bg-white/5 px-3 py-2
                               ${errors.username ? '!border-red-300' : ''
          } `}>
          <Icon kind="search" />
          <input
            className="w-full bg-transparent outline-none 
                                text-sm placeholder:text-white/35"
            placeholder="Search"
            type="username"
            {...register("username")}
          />
        </div>
        <input type="submit" id="search-friend-input"
          className="hidden" />
      </form>
    </div>
  );
};

export default SearchFriendForm;
