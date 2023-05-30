"use client"

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
    Prompt: Prompt;

}

const PromptCard = (props: Props) => {

  return (

<div className="flex flex-col h-full gap-4 justify-between max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <div className="w-full">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{props.Prompt.creator?.name}</h5>

      <p className="font-normal text-gray-700 dark:text-gray-400">{
        props.Prompt.prompt.length > 100
        ? props.Prompt.prompt.substring(0, 100) + "..."
        : props.Prompt.prompt
      }</p>
    </div>
    <div className="flex flex-wrap mt-4">
        {props.Prompt.tags.split(',').map((tag, index) => (
            <span key={index} className="px-2 py-1 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200">{tag}</span>
        ))}
    </div>
</div>
  )
}

export default PromptCard
