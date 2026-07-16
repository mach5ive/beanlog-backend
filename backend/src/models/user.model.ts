import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser> ({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // createdAt: { type: Date, default: Date.now }
},{
  collection: 'users',
  timestamps: true
});

// const User = model("User", UserSchema);
const User = model<IUser>("User", UserSchema);

export default User;