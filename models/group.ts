import { model, Schema, Document } from 'mongoose';

export interface Igroup extends Document {
  name: string;
  creator: string;
  members: string[];
  createdAt: String;
  invitations: string[];
  meetups: { frequency: string; time: string; dogSpotId: string }[];
  description: string;
  selectedFile: string;
}

const groupSchema = new Schema({
  name: { type: String, required: true },
  creator: { type: String, required: true },
  members: { type: [String], required: true },
  createdAt: {
    type: String,
    default: Date.now().toString(),
  },
  invitations: [String],
  meetups: {
    type: [{ frequency: String, time: String, dogSpotId: String }],
    default: [],
  },
  description: { type: String, required: true },
  selectedFile: {
    type: String,
    default:
      'https://i.pinimg.com/originals/5c/e5/e2/5ce5e2ceac058952506371f624c27e8f.jpg',
  },
});

export default model<Igroup>('Group', groupSchema);
