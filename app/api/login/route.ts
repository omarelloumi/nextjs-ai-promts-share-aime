import User from '../../../models/user';
import { connectToDB } from '../../../utils/database';
import * as bcrypt from "bcrypt";

interface RequestBody {
  email: string;
  password: string;
}
export async function POST(request: Request) {
  const body: RequestBody = await request.json();
    let connected = await connectToDB();
    if (!connected) {
        return new Response(JSON.stringify({ error: 'Could not connect to database' }), { status: 500 });
    }
  const user = await User.findOne({
    email: body.email,
  });

  if (user && (await bcrypt.compare(body.password, user.password))) {

    const result = {
        _id: user._id,
        name: user.name,
        email: user.email,
    };
    return new Response(JSON.stringify(result), { status: 200 });
  } else return new Response(JSON.stringify(null), { status: 401 });
}
