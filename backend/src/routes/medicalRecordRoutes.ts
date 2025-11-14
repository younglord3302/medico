import express from 'express';
import { getMedicalRecords, addMedicalRecord, deleteMedicalRecord } from '../controllers/medicalRecordController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.get('/', getMedicalRecords);
router.post('/add', addMedicalRecord);
router.delete('/:id', deleteMedicalRecord);

export default router;
