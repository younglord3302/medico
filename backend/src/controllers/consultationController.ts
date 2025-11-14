import { Request, Response } from 'express';
import Consultation from '../models/Consultation';

// Patients view their consultation notes
export const getConsultations = async (req: Request, res: Response) => {
  try {
    const consultations = await Consultation.find({ patientId: req.user!.id });
    res.json(consultations);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Doctors add consultation notes
export const createConsultation = async (req: Request, res: Response) => {
  const { patientId, notes, appointmentId } = req.body;
  if (!notes) return res.status(400).json({ message: 'Notes required' });

  try {
    const consultation = new Consultation({
      doctorId: req.user!.id,
      patientId,
      notes,
      appointmentId,
    });
    await consultation.save();
    res.status(201).json(consultation);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update consultation (by doctor)
export const updateConsultation = async (req: Request, res: Response) => {
  const { notes } = req.body;
  try {
    const consultation = await Consultation.findById(req.params.id);
    if (!consultation || consultation.doctorId.toString() !== req.user!.id) {
      return res.status(404).json({ message: 'Consultation not found' });
    }
    consultation.notes = notes;
    await consultation.save();
    res.json(consultation);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
