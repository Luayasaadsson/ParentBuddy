import mongoose, { Document, Schema } from "mongoose";

interface IActivityHistory extends Document {
  user: mongoose.Schema.Types.ObjectId;
  recommendations: string;
  preferences: string;
  date: Date;
  isFavorited: boolean;
}

const activityHistorySchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recommendations: { type: String, required: true },
  preferences: { type: String, required: true },
  date: { type: Date, default: Date.now },
  isFavorited: { type: Boolean, default: false },
});

export default mongoose.model<IActivityHistory>(
  "ActivityHistory",
  activityHistorySchema
);
