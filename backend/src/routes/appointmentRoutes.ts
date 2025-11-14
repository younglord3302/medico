import express from 'express';
import {
  bookAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  cancelAppointment
} from '../controllers/appointmentController';
import { authMiddleware, roleMiddleware } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.post('/book', bookAppointment); // Patients book
router.get('/patient', getPatientAppointments);
router.get('/doctor', roleMiddleware('doctor'), getDoctorAppointments); // Doctors only
router.put('/:id/cancel', cancelAppointment);

export default router;
