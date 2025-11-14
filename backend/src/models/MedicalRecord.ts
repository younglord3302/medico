import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String },
  filePath: { type: String },
  fileType: { type: String },
  uploadedAt: { type: Date, default: Date.now },
  recordType: { type: String, enum: ['prescription', 'lab_report', 'xray', 'other'] },
});

export default mongoose.model('MedicalRecord', medicalRecordSchema);
