import { Request, Response } from 'express';
import Prescription from '../models/Prescription';

// Patients view their prescriptions
export const getPrescriptions = async (req: Request, res: Response) => {
  try {
    const prescriptions = await Prescription.find({ patientId: req.user!.id });
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Doctors create a prescription for a patient
export const createPrescription = async (req: Request, res: Response) => {
  const { patientId, medications, instructions, expiryDate } = req.body;
  if (!medications || medications.length === 0) return res.status(400).json({ message: 'Medications required' });

  try {
    const prescription = new Prescription({
      doctorId: req.user!.id,
      patientId,
      medications,
      instructions,
      expiryDate,
    });
    await prescription.save();
    res.status(201).json(prescription);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete prescription (by doctor who created)
export const deletePrescription = async (req: Request, res: Response) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription || prescription.doctorId.toString() !== req.user!.id) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    await prescription.deleteOne();
    res.json({ message: 'Prescription deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
