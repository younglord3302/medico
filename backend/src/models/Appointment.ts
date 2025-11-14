import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dateTime: { type: Date, required: true },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

appointmentSchema.index({ doctorId: 1, dateTime: 1 }, { unique: true }); // Prevent double booking

export default mongoose.model('Appointment', appointmentSchema);
