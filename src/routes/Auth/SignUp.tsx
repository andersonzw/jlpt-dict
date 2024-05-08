import { FormEvent, useState } from "react";
import { signUpUser } from "../../utils/firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { HiLockClosed, HiOutlineMail } from "react-icons/hi";
import { FirebaseError } from "firebase/app";
import { uploadBookmarksToFirebase } from "../../utils/functions";
const SignUp = () => {
  const nav = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const localBookmarks = useAppSelector(selectBookmarks)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const userCredentials = await signUpUser(form.email, form.password);

      // upload the current locally stored bookmarks to database
      await uploadBookmarksToFirebase(userCredentials.user.uid, {
        bookmarkList: localBookmarks,
      } )

      nav("/");
    } catch (error) {
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
      } else {
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
      <h1 className="text-2xl font-bold mb-10">Sign up with email</h1>
      <form
        className="flex flex-col gap-3   "
        action="submit"
        onSubmit={handleSubmit}
      >
        <p className="text-red-500 text-sm italic">{errorMessage}</p>
        <div className="flex w-full border border-gray-400 px-2 py-1 rounded-lg hover:border-theme-red-300 active:outline-theme-red-400 ">
          <HiOutlineMail className="size-6 text-gray-400" />
          <input
            className="grow focus:outline-none pl-2"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.currentTarget.value })}
          />
        </div>
        <div className="flex w-full border border-gray-400 px-2 py-1 rounded-lg hover:border-theme-red-300 focus:outline-theme-red-400 ">
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
          className={`bg-[rgb(255,119,119)] text-white rounded-lg py-1 mt-4 active:translate-y-1 active:shadow-md ${loading}`}
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
        <a href="/signin" className="underline  cursor-pointer">
          Sign in
        </a>
      </p>
    </div>
  );
};

export default SignUp;
