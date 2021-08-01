import mongoose, { Schema, Document } from 'mongoose';

interface IMovie extends Document {
    name: string,
    rating: number
}

interface IUserMovie extends Document{
    email : string,
    movies : [IMovie]
}

const MovieSchema: Schema = new Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
})

const UserMovieSchema : Schema = new Schema({
    email : { type : String, required : true},
    movies : { type : [MovieSchema], required : false}
})

export default mongoose.model<IUserMovie>('UserMovie', UserMovieSchema);