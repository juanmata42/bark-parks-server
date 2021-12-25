import { model, Schema, Document } from 'mongoose';

export interface Ishelter extends Document {
  name: string;
  link: string;
  pnumber: string;
  country: string;
  region: string;
}

const shelterSchema = new Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
  pnumber: { type: String, required: true },
  country: { type: String, required: true },
  region: { type: String, required: true },
});

export default model<Ishelter>('Shelter', shelterSchema);
