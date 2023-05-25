import { useForm, SubmitHandler } from "react-hook-form";
import { useRef, useState } from "react";
import Logo from "../Logo";
import axios from "axios";
import { signIn } from "next-auth/react"

interface RegisterUser {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

type Props = {
  setAuthModal: Function;
};

const Register = (props: Props) => {
  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<RegisterUser>({
    mode: "onChange",
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    }
  });
  const backdropRef = useRef<HTMLDivElement>(null);
  const [submitError, setSubmitError] = useState("");


  const onSubmit: SubmitHandler<RegisterUser> = async data => {
    const { confirmPassword, ...rest } = data;
    try {
    const res = await axios.post("/api/register", rest);
    if (res.status === 200) {
      await signIn("credentials", {
        redirect: true,
        username: rest.email,
        password: rest.password,
      });
      props.setAuthModal("");
    }
    } catch (err: any) {
      setSubmitError(err.response.data.error);
    }
  };

  const handleClose = (e: any) => {
    if (backdropRef.current === e.target) {
      props.setAuthModal("");
    }
  };


  return (
    <>
      <div
      ref={backdropRef}
      onMouseDown={handleClose}
      className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen max-h-full flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-md max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={() => props.setAuthModal("")}
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                // fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                // clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <Logo />
            <h3 className="mt-2 mb-4 text-xl font-medium text-gray-900 dark:text-white flex">
              Please register to continue
            </h3>
            { submitError !== "" && (
              <div className="bg-red-500 rounded-md py-1 px-3 text-white my-2 flex flex-col gap-1">
                <p>{submitError}</p>
              </div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-3.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                />
                {errors?.email && <div className="bg-red-500 rounded-md py-1 px-2 text-white mt-2 flex flex-col gap-1">
                  {errors?.email?.type === "required" && <p>Email is required</p>}
                  {errors?.email?.type === "pattern" && <p>Invalid email address</p>}
                </div> }
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-3.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Jack Smith"
                  {...register("name", { required: true, maxLength: 20, minLength: 3 })}
                />
                {errors?.name && <div className="bg-red-500 rounded-md py-1 px-2 text-white mt-2 flex flex-col gap-1">
                  {errors?.name?.type === "required" && <p>Name is required</p>}
                  {errors?.name?.type === "maxLength" && <p>Name cannot exceed 20 characters</p>}
                  {errors?.name?.type === "minLength" && <p>Name must be at least 3 characters</p>}
                </div> }
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-3.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  {...register("password", { required: true, maxLength: 20, minLength: 6 })}
                />
                {errors?.password && <div className="bg-red-500 rounded-md py-1 px-2 text-white mt-2 flex flex-col gap-1">
                  {errors?.password?.type === "required" && <p>Password is required</p>}
                  {errors?.password?.type === "maxLength" && <p>Password cannot exceed 20 characters</p>}
                  {errors?.password?.type === "minLength" && <p>Password must be at least 6 characters</p>}
                </div> }
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-3.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  {...register("confirmPassword", {
                    validate: (value) => value === watch("password")
                  })}
                />
                {
                  errors?.confirmPassword &&
                    <div className="bg-red-500 rounded-md py-1 px-2 text-white mt-2">
                      <p>Passwords do not match</p>
                    </div>
                }
              </div>
              <button
                disabled={!isValid}
                type="submit"
                className="w-full text-white disabled:opacity-75 bg-purple-700 enabled:hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
              >
                Create account
              </button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                You have an account?{" "}
                <button
                  onClick={() =>props.setAuthModal("login")}
                  className="text-purple-700 hover:underline dark:text-purple-500"
                >
                  Login here
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>

  );
};

export default Register;
