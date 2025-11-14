import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';

dotenv.config();

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import authRoutes from './routes/auth';
import medicalRecordRoutes from './routes/medicalRecordRoutes';
import prescriptionRoutes from './routes/prescriptionRoutes';
import consultationRoutes from './routes/consultationRoutes';

app.use('/auth', authRoutes);
app.use('/records', medicalRecordRoutes);
app.use('/prescriptions', prescriptionRoutes);
app.use('/consultations', consultationRoutes);

// Basic test route
app.get('/', (req, res) => {
  res.json({ message: 'Medico API is running' });
});

// Error handling middleware
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
