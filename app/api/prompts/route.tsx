import Prompt from "../../../models/prompt";
import { connectToDB } from "../../../utils/database";

interface RequestBody {
    creator: string;
    prompt: string;
    tags: string;
}

export const GET = async () => {
    try {
        await connectToDB()
        const prompts = await Prompt.find().populate("creator", "name")
        
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}

export const POST = async (request: Request) => {
    const body: RequestBody = await request.json();

    try {
        await connectToDB();
        const newPrompt = new Prompt({ creator: body.creator, prompt: body.prompt, tags: body.tags });

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}
