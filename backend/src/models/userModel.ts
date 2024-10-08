import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  childAge: number;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  childAge: { type: Number, required: true },
});

export default mongoose.model<IUser>("User", userSchema);
