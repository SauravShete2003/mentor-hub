import { model, Schema } from "mongoose";
const SessionsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sessionToken: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
},{timestamps : true});
const Session = model("Session", SessionsSchema);
export default Session;
