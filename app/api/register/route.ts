import User from '../../../models/user';
import { connectToDB } from '../../../utils/database';
import * as bcrypt from "bcrypt";

interface RequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  let connected = await connectToDB();
    if (!connected) {
        return new Response(JSON.stringify({ error: 'Could not connect to database' }), { status: 500 });
    }

    if (!body.name || !body.email || !body.password) {
        return new Response(JSON.stringify({ error: 'Missing name, email or password' }), { status: 400 });
    }
    const exists = await User.findOne({ email: body.email }).exec();
    if (exists) {
        return new Response(JSON.stringify({ error: 'Email already exists' }), { status: 400 });
    }

    const user = await User.create({
        name: body.name,
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
    });

    const result = {
        _id: user._id,
        name: user.name,
        email: user.email,
    }

  return new Response(JSON.stringify(result), { status: 200 });
}
