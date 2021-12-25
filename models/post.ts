import { model, Schema, Document } from 'mongoose';

export interface Ipost extends Document {
  message: string;
  creator: string;
  tags: string[];
  selectedFile: string;
  likes: string[];
  comments: string[];
  createdAt: string;
}

const postSchema = new Schema({
  message: String,
  creator: { type: String, required: true },
  tags: { type: [String], default: [] },
  selectedFile: String,
  likes: { type: [String], default: [] },
  comments: { type: [String], default: [] },
  createdAt: {
    type: String,
    default: Date.now().toString(),
  },
});

export default model<Ipost>('Post', postSchema);
