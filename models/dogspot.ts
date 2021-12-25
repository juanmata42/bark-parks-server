import { model, Schema, Document } from 'mongoose';

export interface IdogSpot extends Document {
  name: string;
  kind: string;
  selectedFile: string;
  rating: number[];
  mapDirections: string;
}

const dogSpotSchema = new Schema({
  name: { type: String, required: true },
  kind: { type: String, required: true },
  selectedFile: { type: String, required: true },
  rating: { type: [Number], default: [0] },
  mapDirections: { type: String, required: true },
});

export default model<IdogSpot>('DogSpot', dogSpotSchema);
