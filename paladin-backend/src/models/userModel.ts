import mongoose, { Schema, Document } from 'mongoose';
// import Movie, { IMovie } from './movieModel'
export interface IUser extends Document {
  email: string,
  password: string,
  tokens: [string],
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  tokens: { type: [String], required: false }
})

export default mongoose.model<IUser>('User', UserSchema);