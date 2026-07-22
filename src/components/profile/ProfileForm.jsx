import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { updateUser } from "../../reducers/usersSlice";
import Header from "../header/Header";
import ProfileImage from "./ProfileImage";
import Loading from "../loading/Loading";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isGettingUserLoading } = useSelector(
    (state) => state.user
  );

  const [img, setImg] = useState(null);
  const [isImageChange, setIsImageChange] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (!user) return;

    reset({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      bio: user.bio || "",
    });
  }, [user, reset]);

  const onSubmit = async (data) => {
    if (isSaving || !user) return;

    const formData = new FormData();

    formData.append("firstName", data.firstName.trim());
    formData.append("lastName", data.lastName.trim());
    formData.append("bio", data.bio?.trim() || "");
    formData.append("public_id", user.public_id || "");
    formData.append("image_id", String(user.image_id || ""));

    if (isImageChange && img) {
      formData.append("image", img);
    }

    try {
      setIsSaving(true);
      setSubmitError("");

      await dispatch(updateUser(formData)).unwrap();

      setImg(null);
      setIsImageChange(false);

      navigate("/profile", {
        replace: true,
      });
    } catch (error) {
      setSubmitError(
        error?.message ||
        error ||
        "Unable to save your profile."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass = (hasError) => `
    w-full rounded-xl border
    bg-white/[0.05]
    px-4 py-3
    text-sm text-white
    outline-none backdrop-blur-md
    transition
    placeholder:text-white/30
    ${hasError
      ? `
          border-rose-400/55
          shadow-[0_0_0_1px_rgba(255,90,95,0.25),0_0_18px_rgba(255,90,95,0.14)]
        `
      : `
          border-white/15
          shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]
          focus:border-sky-200/55
          focus:bg-white/[0.07]
          focus:ring-2
          focus:ring-sky-300/15
        `
    }
  `;

  if (isGettingUserLoading || !user) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center">
        <Loading />
      </div>
    );
  }

  const disableSubmit =
    (!isDirty && !isImageChange) || isSaving;

  return (
    <div className="min-h-[100dvh] w-full text-white">
      <Header title="Edit Profile" showBack />

      <main
        className="
          mx-auto w-full max-w-[520px]
          px-4 pb-[100px] pt-[78px]
        "
      >
        <section className="flex justify-center">
          <ProfileImage
            img={img}
            setImg={setImg}
            setIsImageChange={setIsImageChange}
          />
        </section>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-7 space-y-5"
        >
          <div>
            <label
              htmlFor="firstName"
              className="mb-1.5 ml-1 block text-sm font-medium text-white/70"
            >
              First name
            </label>

            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="Enter your first name"
              className={inputClass(Boolean(errors.firstName))}
              {...register("firstName", {
                required: "First name is required.",
                maxLength: {
                  value: 30,
                  message:
                    "First name cannot exceed 30 characters.",
                },
              })}
            />

            {errors.firstName ? (
              <p className="mt-1.5 pl-1 text-xs text-rose-300">
                {errors.firstName.message}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="mb-1.5 ml-1 block text-sm font-medium text-white/70"
            >
              Last name
            </label>

            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Enter your last name"
              className={inputClass(Boolean(errors.lastName))}
              {...register("lastName", {
                required: "Last name is required.",
                maxLength: {
                  value: 30,
                  message:
                    "Last name cannot exceed 30 characters.",
                },
              })}
            />

            {errors.lastName ? (
              <p className="mt-1.5 pl-1 text-xs text-rose-300">
                {errors.lastName.message}
              </p>
            ) : null}
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between px-1">
              <label
                htmlFor="bio"
                className="text-sm font-medium text-white/70"
              >
                Status
              </label>

              <span className="text-[11px] text-white/35">
                Maximum 100 characters
              </span>
            </div>

            <textarea
              id="bio"
              rows={4}
              placeholder="Write something about yourself"
              className={`${inputClass(
                Boolean(errors.bio)
              )} resize-none`}
              {...register("bio", {
                maxLength: {
                  value: 100,
                  message:
                    "Status cannot exceed 100 characters.",
                },
              })}
            />

            {errors.bio ? (
              <p className="mt-1.5 pl-1 text-xs text-rose-300">
                {errors.bio.message}
              </p>
            ) : null}
          </div>

          {submitError ? (
            <div
              role="alert"
              className="
                rounded-xl border border-rose-400/25
                bg-rose-500/10 px-4 py-3
                text-sm text-rose-200
              "
            >
              {submitError}
            </div>
          ) : null}

          <div className="space-y-3 pt-1">
            <button
              type="submit"
              disabled={disableSubmit}
              className={`
                flex h-12 w-full items-center
                justify-center rounded-xl border
                text-sm font-semibold transition
                active:scale-[0.99]
                ${disableSubmit
                  ? `
                      cursor-not-allowed
                      border-white/10
                      bg-white/[0.04]
                      text-white/35
                    `
                  : `
                      border-sky-300/35
                      bg-sky-500/20
                      text-white
                      shadow-[0_0_0_1px_rgba(120,220,255,0.24),0_10px_30px_rgba(40,120,255,0.18),0_0_28px_rgba(80,200,255,0.14)]
                      hover:border-sky-200/50
                      hover:bg-sky-400/25
                    `
                }
              `}
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <span
                    className="
                      h-4 w-4 animate-spin rounded-full
                      border-2 border-white/25
                      border-t-white
                    "
                  />

                  Saving changes...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={isSaving}
              className="
                h-12 w-full rounded-xl
                border border-white/10
                bg-white/[0.03]
                text-sm font-medium text-white/65
                transition
                hover:border-white/20
                hover:bg-white/[0.06]
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProfileForm;