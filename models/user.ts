import { Schema, model, Model, Document, models } from 'mongoose';

interface IUser extends Document {
  email: string;
  name: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  name: {
    type: String,
    required: [true, 'Name is required!']
  },
  password: {
    type: String,
    required: [true, 'Password is required!']
  },
});

const User: Model<IUser> = models.User as Model<IUser> || model<IUser>("User", UserSchema);

export default User;
