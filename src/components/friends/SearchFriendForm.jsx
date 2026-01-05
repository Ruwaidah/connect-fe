// import "./SearchFriendForm.css";
import { useForm } from "react-hook-form";

const SearchFriendForm = () => {
  const { register, handleSubmit, formState, reset, watch } = useForm();

  const submitBtn = (e) => {
    e.preventDefault();
    document.getElementById("search-friend-input").click();
  };

  const onSubmit = (data) => {};

  return (
    <div className="SearchFriendForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Search for friend"
          className="search-input"
          type="text"
          {...register("text", {
            required: {
              value: true,
              message: "Require",
            },
          })}
        />
        <img src="./assets/search-user.png" onClick={submitBtn} />
        <input type="submit" id="search-friend-input" />
      </form>
    </div>
  );
};

export default SearchFriendForm;
