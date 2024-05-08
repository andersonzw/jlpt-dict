import { FormEvent, useState } from "react";
import { signInUser } from "../../utils/firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { HiLockClosed, HiOutlineMail } from "react-icons/hi";
import { useAppDispatch } from "../../utils/store";
import {
  clearBookmarks,
  syncBookmarks,
} from "../../utils/slices/bookmarkReducer";
import { fetchBookmarksFromFirebase } from "../../utils/functions";
import { BookmarkCollection } from "../../utils/types";
import { FirebaseError } from "firebase/app";

const SignIn = () => {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    try {
      const userCredential = await signInUser(form.email, form.password);
      // reset bookmark states
      dispatch(clearBookmarks());

      // fetch and sync bookmark to local bookmark upon signing in
      const fetchedBookmarks: BookmarkCollection =
        await fetchBookmarksFromFirebase(userCredential.user.uid);
      dispatch(syncBookmarks(fetchedBookmarks));
      nav("/");
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === "auth/invalid-credential"
      ) {
        setErrorMessage("Invalid email or password.");
      } else {
        setErrorMessage("Unable to login. Try again.");
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
      <h1 className="text-2xl font-bold mb-10">Log in to JLPT Dict</h1>
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
            value={form.email}
            required
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
            <span>Log in</span>
          )}
        </button>
      </form>
      <p className="block mt-4 text-sm">
        Don't have an account?{" "}
        <a href="/signup" className="cursor-pointer underline">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default SignIn;
