import { FormEvent, useState } from "react";

const SignIn = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    setForm({ email: "", password: "" });
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
        <input
          className="border border-gray-400 px-4 py-1 rounded-lg"
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.currentTarget.value })}
        />
        <input
          className="border border-gray-400 px-4 py-1 rounded-lg"
          type="text"
          name="password"
          id="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.currentTarget.value })
          }
        />

        <button
          type="submit"
          className="bg-[rgb(255,119,119)] text-white rounded-lg py-1 mt-4"
        >
          Log in
        </button>
      </form>
      <a className="block mt-4 text-sm cursor-pointer">Create an account</a>
    </div>
  );
};

export default SignIn;
