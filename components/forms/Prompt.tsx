"use client"

import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/react";
import Logo from "../Logo";
import TagInput from '@eidellev/react-tag-input';

interface Prompt {
    creator?: string;
    prompt: string;
    tags: string;
}

type Props = {
    setAuthModal?: Function;
    update?: Prompt;
}

const Prompt = (props: Props) => {
    const userId = useSession().data?.user?._id;
    const [tags, setTags] = useState<string[]>(props.update?.tags?.split(',') || []);
    const [tagsError, setTagsError] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
      } = useForm<Prompt>({
        mode: "onChange",
        defaultValues: {
            prompt: props.update?.prompt || "",
        },
    });

    const backdropRef = useRef<HTMLDivElement>(null);
    const [submitError, setSubmitError] = useState("");


    const onSubmit: SubmitHandler<Prompt> = async (data) => {
        if (tags.length === 0) {
          setTagsError(true);
          return;
        }
        data.tags = tags.join(',')
        data.creator = userId
        console.log(data)
        try {
          const res = await axios.post("/api/prompts",JSON.stringify(data));
          if (res.status === 200) {
            props.setAuthModal && props.setAuthModal("");
          }
        } catch (err: any) {
          setSubmitError(err.response.data.error);
        }
      };

    const handleClose = (e: any): void => {
        if (backdropRef.current === e.target) {
          props.setAuthModal && props.setAuthModal("");
        }
    };

    const tagInputChange = (newValue:string[]) => {
        setTags(newValue);
        newValue.length === 0 ? setTagsError(true) : setTagsError(false)
    }

  return (
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
              onClick={() => {
                props.setAuthModal && props.setAuthModal("");
              }}
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
                Create a Prompt
            </h3>
            {submitError !== "" && (
              <div className="my-2 flex flex-col gap-1 rounded-md bg-red-500 px-3 py-1 text-white">
                <p>{submitError}</p>
              </div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="prompt"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Prompt
                </label>
                <textarea
                  id="prompt"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3.5 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                  placeholder="Write your prompt here..."
                  {...register("prompt", {
                    required: true
                  })}
                />
                {errors?.prompt && (
                  <div className="mt-2 flex flex-col gap-1 rounded-md bg-red-500 px-2 py-1 text-white">
                    {errors?.prompt?.type === "required" && (
                      <p>Prompt is required</p>
                    )}
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="tags"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                    Tags
                </label>
                <TagInput value={tags} onChange={(newValue) => tagInputChange(newValue)} colorize placeholder="New Tag"/>
                {tagsError && (
                  <div className="mt-2 flex flex-col gap-1 rounded-md bg-red-500 px-2 py-1 text-white">
                      <p>At least one tag is required</p>
                  </div>
                )}
              </div>
              <button
                disabled={!isValid || tags.length === 0}
                type="submit"
                className="w-full rounded-lg bg-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-purple-300 enabled:hover:bg-purple-800 disabled:opacity-75 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
              >
                {props.update ? "Update Prompt" : "Create Prompt"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Prompt
