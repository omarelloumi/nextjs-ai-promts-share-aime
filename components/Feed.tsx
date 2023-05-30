import axios from "axios";
import { Prompt } from "next/font/google";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import Spinner from "./Spinner";
import PromptModal from "./modals/PromptModal";


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

const Feed = () => {
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [loading, setLoading] = useState(true);
    const [gridStyle, setGridStyle] = useState("");
    const [promptOpen, setPromptOpen] = useState<Prompt|null>(null);

    useEffect(() => {
        const fetchPrompts = async () => {
            try {
                const res = await axios.get("/api/prompts");
                if (res.status === 200) {
                    setPrompts(res.data);
                    setLoading(false);
                }
            } catch (err: any) {
                console.log(err);
            }
        };

        const setStyle = async () => {
            await fetchPrompts();
            switch (prompts.length) {
                case 1:
                    setGridStyle("grid grid-cols-1 gap-4 mt-4 cursor-pointer");
                    break;
                case 2:
                    setGridStyle("grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 cursor-pointer");
                    break;
            }
            if (prompts.length > 2) {
                setGridStyle("grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3 cursor-pointer");
            }
        };
        setStyle();
    }, [prompts.length]);

  return (
    <>
    <section className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Prompts</h1>
            {loading ? (
                <div className="mt-4" >
                    <Spinner />
                </div>
            ) : (
                <div className={gridStyle}>
                {prompts.map((prompt) => (
                    <div onClick={() => setPromptOpen(prompt)} key={prompt._id}>
                        <PromptCard Prompt={prompt} />
                    </div>
                ))}
                </div>
            )}

    </section>
    {promptOpen && <PromptModal prompt={promptOpen} setPromptOpen={setPromptOpen} />}
    </>
  )
}

export default Feed
