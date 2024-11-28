import { Router, Request, Response, RequestHandler, NextFunction } from 'express';
import { prismaClient } from '..';
import { hashSync, compareSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secretes';
import { BadRequest } from '../exception/badrequest';
import { ErrorCodes } from '../exception/root';
import { UnprocessableEntity } from '../exception/validation';
import { SignupSchema } from '../schema/user';

// Define signup controller
const signup: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        SignupSchema.parse(req.body);

        const { name, email, password } = req.body;

        let user = await prismaClient.user.findFirst({ where: { email } });
        if (user) {
            next(new BadRequest('User already exists', ErrorCodes.USER_ALREADY_EXISTS))
        }
        user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: hashSync(password, 10)
            }
        });

        res.json(user);

    } catch (err: any) {
        next( new UnprocessableEntity(err?.issues, 'Unprocessable Entity', ErrorCodes.UNPROCESSABLE_ENTITY));

    }
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

    res.json({ user, token });
}


// Create router and add routes
const authRouter = Router();
authRouter.post('/signup', signup);
authRouter.post('/login', login);

export default authRouter;