import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import { Request, Response } from 'express';
import User from '../models/User';
import Doctor from '../models/Doctor';

const registerSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(12).required(),
  phone: Joi.string(),
  role: Joi.string().valid('patient', 'doctor').required(),
  specialization: Joi.string().when('role', { is: 'doctor', then: Joi.required() }),
  qualifications: Joi.string().when('role', { is: 'doctor', then: Joi.required() }),
  licenseNumber: Joi.string().when('role', { is: 'doctor', then: Joi.required() }),
  experienceYears: Joi.number().when('role', { is: 'doctor', then: Joi.required() })
});

export const register = async (req: Request, res: Response) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, email, password, phone, role, specialization, qualifications, licenseNumber, experienceYears } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ name, email, password: hashedPassword, phone, role });
    await user.save();

    if (role === 'doctor') {
      const doctor = new Doctor({ userId: user._id, specialization, qualifications, licenseNumber, experienceYears });
      await doctor.save();
    }

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const login = async (req: Request, res: Response) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '7d' });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
