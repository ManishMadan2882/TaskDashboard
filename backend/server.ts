import { PrismaClient } from "@prisma/client";
import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth'
import assignmentRouter from './routes/assignment'
import projectRouter from './routes/project'

dotenv.config();

const prisma = new PrismaClient();

const app = express();

const port: number = Number(process.env.PORT) || 8000;

app.use(express.json())

async function main() {
    //here comes our queries
}
main().then(async () => {
    await prisma.$disconnect();
})
    .catch(async (error) => {
        console.log(error);
        await prisma.$disconnect();
        process.exit(1);
    })
app.use('/api/auth',authRouter)

app.use('/api/assignment',assignmentRouter)

app.use('/api/project',projectRouter)

app.listen(port, () => console.log('Server is running at ' + port))