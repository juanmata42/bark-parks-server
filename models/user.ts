/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-return-await */
import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
  profilePhoto: string;
  bark: string;
  location: string;
  description:string;
  groups: string[];
  groupRequests: string[];
  posts: object[];
  favorites: string[];
  friends: string[];
  friendRequests: object[];
  friendRequestsSent: object[];
  notifications: boolean;
}

const userSchema = new Schema<IUser>({
  name: { type: String, default: 'Pupper' },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  profilePhoto: {
    type: String,
    default:
      'https://www.eugeneweekly.com/wp-content/uploads/2020/08/20200820pets-1-lede-1300x844.jpg',
  },
  bark: {
    type: String,
    default:
      'https://soundbible.com/mp3/Dog%20Woof-SoundBible.com-457935112.mp3',
  },
  location: { type: String, default: '' },
  description:{type: String, default: '' },
  groups: [String],
  groupRequests: [String],
  posts: [Object],
  favorites: [String],
  friends: [String],
  friendRequests: [Object],
  friendRequestsSent: [Object],
  notifications: { type: Boolean, default: true },
});

// eslint-disable-next-line consistent-return
userSchema.pre<IUser>('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', userSchema);
