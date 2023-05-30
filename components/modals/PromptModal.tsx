import { useRef, useState} from "react";
import Logo from "../Logo";

interface Creator {
    _id: string;
    name: string;
  }

  interface Prompt {
    _id: string;
    creator?: Creator;
    prompt: string;
    tags: string;
  }

type Props = {
    prompt: Prompt;
    setPromptOpen: Function
}

const PromptModal = (props: Props) => {
    const backdropRef = useRef<HTMLDivElement>(null);
    const [tags, setTags] = useState<string[]>(props.prompt?.tags?.split(',') || []);

    const handleClose = (e: any): void => {
        if (backdropRef.current === e.target) {
          props.setPromptOpen && props.setPromptOpen(null);
        }
    };

  return (
    <div
      ref={backdropRef}
      onMouseDown={handleClose}
      className="fixed left-0 right-0 top-0 z-50 flex h-screen max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-30 p-4 backdrop-blur-sm md:inset-0"
    >
      <div className="relative max-h-full w-full max-w-md">
        {/* Modal content */}
        <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
          {props.setPromptOpen && (
            <button
              onClick={() => {
                props.setPromptOpen && props.setPromptOpen(null);
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
                Prompt by {props.prompt?.creator?.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
                {props.prompt?.prompt}
            </p>
            <div className="flex flex-wrap mt-4">
                {tags.map((tag, index) => (
                    <span key={index} className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 mr-2 mb-2">
                        {tag}
                    </span>
                ))}
            </div>
            </div>
        </div>
        </div>
    </div>

  )
}

export default PromptModal
