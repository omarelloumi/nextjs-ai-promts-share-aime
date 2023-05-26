import { useForm, SubmitHandler } from "react-hook-form";
import { useRef, useState } from "react";
import Logo from "../Logo";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";

interface RegisterUser {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

type Props = {
  setAuthModal?: Function;
};

const Register = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<RegisterUser>({
    mode: "onChange",
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });
  const backdropRef = useRef<HTMLDivElement>(null);
  const [submitError, setSubmitError] = useState("");

  const onSubmit: SubmitHandler<RegisterUser> = async (data) => {
    const { confirmPassword, ...rest } = data;
    try {
      const res = await axios.post("/api/register", rest);
      if (res.status === 200) {
        await signIn("credentials", {
          redirect: true,
          username: rest.email,
          password: rest.password,
        });
        props.setAuthModal && props.setAuthModal("");
      }
    } catch (err: any) {
      setSubmitError(err.response.data.error);
    }
  };

  const handleClose = (e: any) => {
    if (backdropRef.current === e.target) {
      props.setAuthModal && props.setAuthModal("");
    }
  };

  return (
    <>
      <div
        ref={backdropRef}
        onMouseDown={handleClose}
        className="fixed left-0 right-0 top-0 z-50 flex h-screen max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-30 p-4 backdrop-blur-sm md:inset-0"
      >
        <div className="relative max-h-full w-full max-w-md">
          {/* Modal content */}
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
            {props.setAuthModal && (
              <button
                onClick={() => props.setAuthModal && props.setAuthModal("")}
                className="absolute right-2.5 top-3 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
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
            )}
            <div className="px-6 py-6 lg:px-8">
              <Logo />
              <h3 className="mb-4 mt-2 flex text-xl font-medium text-gray-900 dark:text-white">
                Please register to continue
              </h3>
              {submitError !== "" && (
                <div className="my-2 flex flex-col gap-1 rounded-md bg-red-500 px-3 py-1 text-white">
                  <p>{submitError}</p>
                </div>
              )}
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3.5 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="name@company.com"
                    {...register("email", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                  />
                  {errors?.email && (
                    <div className="mt-2 flex flex-col gap-1 rounded-md bg-red-500 px-2 py-1 text-white">
                      {errors?.email?.type === "required" && (
                        <p>Email is required</p>
                      )}
                      {errors?.email?.type === "pattern" && (
                        <p>Invalid email address</p>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3.5 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="Jack Smith"
                    {...register("name", {
                      required: true,
                      maxLength: 20,
                      minLength: 3,
                    })}
                  />
                  {errors?.name && (
                    <div className="mt-2 flex flex-col gap-1 rounded-md bg-red-500 px-2 py-1 text-white">
                      {errors?.name?.type === "required" && (
                        <p>Name is required</p>
                      )}
                      {errors?.name?.type === "maxLength" && (
                        <p>Name cannot exceed 20 characters</p>
                      )}
                      {errors?.name?.type === "minLength" && (
                        <p>Name must be at least 3 characters</p>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3.5 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    {...register("password", {
                      required: true,
                      maxLength: 20,
                      minLength: 6,
                    })}
                  />
                  {errors?.password && (
                    <div className="mt-2 flex flex-col gap-1 rounded-md bg-red-500 px-2 py-1 text-white">
                      {errors?.password?.type === "required" && (
                        <p>Password is required</p>
                      )}
                      {errors?.password?.type === "maxLength" && (
                        <p>Password cannot exceed 20 characters</p>
                      )}
                      {errors?.password?.type === "minLength" && (
                        <p>Password must be at least 6 characters</p>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3.5 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    {...register("confirmPassword", {
                      validate: (value) => value === watch("password"),
                    })}
                  />
                  {errors?.confirmPassword && (
                    <div className="mt-2 rounded-md bg-red-500 px-2 py-1 text-white">
                      <p>Passwords do not match</p>
                    </div>
                  )}
                </div>
                <button
                  disabled={!isValid}
                  type="submit"
                  className="w-full rounded-lg bg-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-purple-300 enabled:hover:bg-purple-800 disabled:opacity-75 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                >
                  Create account
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  You have an account?{" "}
                  {props.setAuthModal ? (
                    <button
                      onClick={() => props.setAuthModal!("login")}
                      className="text-purple-700 hover:underline dark:text-purple-500"
                    >
                      Login here
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="text-purple-700 hover:underline dark:text-purple-500"
                    >
                      {" "}
                      Login here{" "}
                    </Link>
                  )}
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
