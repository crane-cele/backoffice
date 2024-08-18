import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';
import messageRoutes from './routes/message';
import segmentRoutes from './routes/segment';
import cors from 'cors'

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/segments', segmentRoutes);

export default app;