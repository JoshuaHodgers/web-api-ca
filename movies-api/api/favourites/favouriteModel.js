import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FavouriteSchema = new Schema({
    movieId: { type: Number, required: true },
    title: { type: String, required: true },
    poster_path: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model('Favourite', FavouriteSchema);