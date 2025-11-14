import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }, // Optional
  notes: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
});

export default mongoose.model('Consultation', consultationSchema);
