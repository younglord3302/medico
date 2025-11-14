import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medications: { type: [String], required: true }, // Array of medication names
  instructions: { type: String },
  issuedAt: { type: Date, default: Date.now },
  expiryDate: { type: Date },
});

export default mongoose.model('Prescription', prescriptionSchema);
