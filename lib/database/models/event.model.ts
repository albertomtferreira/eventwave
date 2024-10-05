import { model, models, Schema } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string;
  description?: string;
  locality?: string;
  imageUrl: string;
  createdAt: Date;
  startDateTime: Date;
  endDateTime: Date;
  category: { _id: string, name: string };
  organizer: { _id: string, firstName: string, lastName: string };
  price: string;
  isFree: boolean;
  url: string;
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  locality: { type: String },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  organizer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  price: { type: String },
  isFree: { type: Boolean, default: false },
  url: { type: String, required: true },
})

const Event = models.Event || model("Event", EventSchema)

export default Event
