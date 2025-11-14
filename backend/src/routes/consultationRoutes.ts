import express from 'express';
import { getConsultations, createConsultation, updateConsultation } from '../controllers/consultationController';
import { authMiddleware, roleMiddleware } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.get('/', getConsultations); // Patients get own
router.post('/add', roleMiddleware('doctor'), createConsultation); // Doctors add
router.put('/:id', roleMiddleware('doctor'), updateConsultation); // Doctors update own

export default router;
