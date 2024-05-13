import { FormEvent, useState } from "react";
import { signUpUser } from "../../utils/firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { HiLockClosed, HiOutlineMail } from "react-icons/hi";
import { FirebaseError } from "firebase/app";
import { uploadBookmarksToFirebase } from "../../utils/functions";
import { useAppSelector } from "../../utils/store";
import { selectBookmarks } from "../../utils/slices/bookmarkReducer";
const SignUp = () => {
  const nav = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const localBookmarks = useAppSelector(selectBookmarks);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const userCredentials = await signUpUser(form.email, form.password);

      // upload the current locally stored bookmarks to database
      await uploadBookmarksToFirebase(userCredentials.user.uid, {
        bookmarkList: localBookmarks,
      });

      nav("/");
    } catch (error) {
      console.error(error);
      if (
        error instanceof FirebaseError &&
        error.code === "auth/email-already-in-use"
      ) {
        setErrorMessage("Email already in use.");
      } else if (
        error instanceof FirebaseError &&
        error.code === "auth/weak-password"
      ) {
        setErrorMessage("Password should be at least 6 characters.");
      } else if (
        error instanceof FirebaseError &&
        error.code === "auth/invalid-email"
      ){
        setErrorMessage("Invalid email address.")
      }
      
      else {
        setErrorMessage("Unable to sign up. Try again.");
      }
    }
    setLoading(false);
  };

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="flex-col mx-auto text-center max-w-[400px] mt-[8rem]">
      <img
        className="object-cover w-[200px] sm:w-[280px] mx-auto rounded-xl sm:mb-10 mb-5"
        src="/header-logo.webp"
        alt=""
      />
      <h1 className="text-2xl font-bold mb-5">Sign up with email </h1>
      <form
        className="flex flex-col gap-3   "
        action="submit"
        onSubmit={handleSubmit}
      >
        <p className="text-red-500 text-sm italic">{errorMessage}</p>
        <div className="flex m-auto w-3/4 sm:w-full border border-gray-400 px-2 py-1 rounded-lg hover:border-theme-red-300 active:outline-theme-red-400 ">
          <HiOutlineMail className="size-6 text-gray-400" />
          <input
            className="grow focus:outline-none pl-2"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={form.email}
            required
            onChange={(e) => setForm({ ...form, email: e.currentTarget.value })}
          />
        </div>

        <div className="flex m-auto w-3/4 sm:w-full border border-gray-400 px-2 py-1 rounded-lg hover:border-theme-red-300 focus:outline-theme-red-400 ">
          <HiLockClosed className="size-6 text-gray-400" />
          <input
            className="grow focus:outline-none pl-2"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={form.password}
            required
            onChange={(e) =>
              setForm({ ...form, password: e.currentTarget.value })
            }
          />
        </div>
        <button
          type="submit"
          className={`m-auto w-3/4 sm:w-full bg-[rgb(255,119,119)] text-white rounded-lg py-1 mt-4 active:shadow-md ${loading}`}
        >
          {loading ? (
            <span>
              <i className="fa fa-spinner fa-spin"></i>
            </span>
          ) : (
            <span>Sign up</span>
          )}
        </button>
      </form>
      <p className="block mt-4 text-sm">
        Already have an account?{" "}
        <a
          href="/signin"
          className="underline  cursor-pointer text-theme-red-500"
        >
          Sign in
        </a>
      </p>
    </div>
  );
};

export default SignUp;
