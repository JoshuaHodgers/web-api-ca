import express from 'express';
import asyncHandler from 'express-async-handler';
import Favourite from './favouriteModel';

const router = express.Router();

// Get logged in user's favourite movies
router.get('/', asyncHandler(async (req, res) => {
    const favourites = await Favourite.find({ userId: req.user._id });
    res.status(200).json(favourites);
}));

// Add a favourite movie
router.post('/', asyncHandler(async (req, res) => {
    const favourite = req.body;
    favourite.userId = req.user._id;

    const existingFavourite = await Favourite.findOne({
        movieId: favourite.movieId,
        userId: req.user._id
    });

    if (existingFavourite) {
        return res.status(400).json({ success: false, msg: 'Movie already in favourites.' });
    }

    const newFavourite = await Favourite(favourite).save();
    res.status(201).json(newFavourite);
}));

// Delete a favourite movie
router.delete('/:movieId', asyncHandler(async (req, res) => {
    const result = await Favourite.deleteOne({
        movieId: req.params.movieId,
        userId: req.user._id
    });

    if (result.deletedCount) {
        res.status(204).json();
    } else {
        res.status(404).json({ success: false, msg: 'Favourite not found.' });
    }
}));

export default router;