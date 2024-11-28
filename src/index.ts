import express, { Express, Request, Response} from 'express';
import { PORT } from './secretes';
import rootRouter from './routes';
import { PrismaClient } from '@prisma/client';

const app:Express = express();

app.use(express.json());


app.use('/api', rootRouter);    

export const prismaClient = new PrismaClient({
    log: ['query']
})

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});