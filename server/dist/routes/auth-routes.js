import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
    // TODO: If the user exists and the password is correct, return a JWT token
    try {
        const { username, password } = req.body;
        const user = await User.findOne({
            where: {
                username: username
            }
        });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            });
        }
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            res.status(401), ({ message: 'Invalid username or password' });
            return;
        }
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        return res.status(220).json({
            success: true,
            token
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'login error'
        });
    }
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
