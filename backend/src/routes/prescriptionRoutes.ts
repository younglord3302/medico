import express from 'express';
import { getPrescriptions, createPrescription, deletePrescription } from '../controllers/prescriptionController';
import { authMiddleware, roleMiddleware } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.get('/', getPrescriptions); // Patients get own
router.post('/add', roleMiddleware('doctor'), createPrescription); // Only doctors
router.delete('/:id', roleMiddleware('doctor'), deletePrescription); // Only doctors who created

export default router;
