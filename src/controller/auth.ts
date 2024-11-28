import { Router, Request, Response, RequestHandler } from 'express';
import { prismaClient } from '..';
import { hashSync, compareSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secretes';

// Define signup controller
const signup: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } });
    if (user) {
        res.status(400).json({ error: 'User already exists' });
        return;
    }
    user = await prismaClient.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10)
        }
    });

    res.json(user);
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const user = await prismaClient.user.findFirst({ where: { email } });
    if (!user) {
        res.status(400).json({ error: 'User not found' });
        return;
    }

    if (!compareSync(password, user.password)) {
        res.status(400).json({ error: 'Invalid password' });
        return;
    }
    const token = jwt.sign({
        id: user.id
    }, JWT_SECRET, { expiresIn: '1h' });

    res.json({user, token});
}


// Create router and add routes
const authRouter = Router();
authRouter.post('/signup', signup);
authRouter.post('/login', login);

export default authRouter;