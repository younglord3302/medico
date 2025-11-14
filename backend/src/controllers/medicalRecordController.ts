import { Request, Response } from 'express';
import MedicalRecord from '../models/MedicalRecord';

// Patients can view their own records
export const getMedicalRecords = async (req: Request, res: Response) => {
  try {
    const records = await MedicalRecord.find({ patientId: req.user!.id });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a medical record (stub for now, no file upload)
export const addMedicalRecord = async (req: Request, res: Response) => {
  const { fileName, recordType } = req.body;
  if (!fileName || !recordType) return res.status(400).json({ message: 'fileName and recordType required' });

  try {
    const record = new MedicalRecord({
      patientId: req.user!.id,
      fileName,
      recordType,
      filePath: 'path/to/file', // Placeholder
    });
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete own record
export const deleteMedicalRecord = async (req: Request, res: Response) => {
  try {
    const record = await MedicalRecord.findById(req.params.id);
    if (!record || record.patientId.toString() !== req.user!.id) {
      return res.status(404).json({ message: 'Record not found' });
    }
    await record.deleteOne();
    res.json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
