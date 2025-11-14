import { Request, Response } from 'express';
import Appointment from '../models/Appointment';

// Patients book appointments
export const bookAppointment = async (req: Request, res: Response) => {
  const { doctorId, dateTime, notes } = req.body;
  const patientId = req.user!.id;

  try {
    const appointment = new Appointment({ patientId, doctorId, dateTime, notes });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Appointment already booked at this time' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Get patient's appointments
export const getPatientAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find({ patientId: req.user!.id }).populate('doctorId', 'name');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get doctor's appointments
export const getDoctorAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.user!.id }).populate('patientId', 'name');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel appointment (patient or doctor)
export const cancelAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    if (appointment.patientId.toString() !== req.user!.id && appointment.doctorId.toString() !== req.user!.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    appointment.status = 'cancelled';
    await appointment.save();
    res.json({ message: 'Appointment cancelled' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
