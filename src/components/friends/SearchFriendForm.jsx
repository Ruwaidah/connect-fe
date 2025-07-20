import "./SearchFriendForm.css";
import { useForm } from "react-hook-form";

const SearchFriendForm = () => {
  const { register, handleSubmit, formState, reset, watch } = useForm();

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
      </form>
    </div>
  );
};

export default SearchFriendForm;
