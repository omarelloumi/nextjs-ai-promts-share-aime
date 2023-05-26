import Prompt from "../../../../models/prompt";
import { connectToDB } from "../../../../utils/database";

interface RequestBody {
    userId: string;
    prompt: string;
    tag: string;
}

export const POST = async (request: Request) => {
    const body: RequestBody = await request.json();

    try {
        await connectToDB();
        const newPrompt = new Prompt({ creator: body.userId, prompt: body.prompt, tag: body.tag });

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}
