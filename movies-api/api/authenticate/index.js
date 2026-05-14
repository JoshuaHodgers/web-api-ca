import jwt from 'jsonwebtoken';
import User from '../users/userModel.js';

export default async function authenticate(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({ success: false, msg: 'No authorization header' });
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findByUserName(decoded.username);

        if (!user) {
            return res.status(401).json({ success: false, msg: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, msg: 'Invalid token' });
    }
}