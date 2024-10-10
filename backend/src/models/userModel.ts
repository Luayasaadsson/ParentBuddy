import mongoose, { Document, Schema } from "mongoose";

interface Location {
  latitude: number;
  longitude: number;
}

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  location?: Location;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
});

export default mongoose.model<IUser>("User", userSchema);
