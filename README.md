# Medico

A comprehensive full-stack medical application for managing patient healthcare records, appointments, prescriptions, and consultations. Designed with HIPAA compliance basics and user-friendly interfaces for patients and doctors.

## 🚀 Features

### 🔐 Authentication & Authorization
- Secure JWT-based authentication
- Role-based access control (Patients, Doctors)
- Multi-level security with encrypted passwords

### 📋 Medical Records Management
- Patients can view/add/delete their medical records
- Support for various record types (lab reports, X-rays, prescriptions, etc.)
- Secure file handling (prepared for AWS S3 integration)

### 💊 Prescriptions & Consultations
- Doctors can create digital prescriptions
- Consultation notes documentation
- Patient access to their prescriptions and consultation history

### 📅 Appointment Scheduling
- Book appointments with doctors
- View and cancel personal appointments
- Doctor availability management
- Conflict prevention (no double bookings)

### 🎨 Modern UI/UX
- Responsive React frontend with Tailwind CSS
- Eye-catching gradient designs and professional styling
- Intuitive dashboards for patients and doctors
- Mobile-first approach

## 🛠 Tech Stack

### Backend
- **Node.js** with **Express** framework
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** authentication
- **bcryptjs** for password hashing
- **Express Rate Limit** for API protection
- **Helmet** and **CORS** for security

### Frontend
- **React** 19 with **TypeScript**
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Context API** for state management
- **React Icons** for UI elements

## 🔥 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/younglord3302/medico.git
   cd medico
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Update with your environment variables
   npm run build
   npm start  # Production, or npm run dev for development
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

   The app will be available at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

4. **MongoDB Configuration**
   - For local MongoDB: Use `mongodb://localhost:27017/medico`
   - For MongoDB Atlas: Update the connection string in `.env`

## 📋 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/medico
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
REFRESH_TOKEN_SECRET=your-refresh-secret-key
REFRESH_TOKEN_EXPIRE=30d
```

### Frontend
Make sure the backend URL is configured in API calls (currently `http://localhost:5000`)

## 🔧 API Documentation

### Authentication Endpoints
- `POST /auth/register` - Register patient/doctor
- `POST /auth/login` - User login

### Medical Records
- `GET /records` - Get own records (patient)
- `POST /records/add` - Add new record
- `DELETE /records/:id` - Delete record

### Prescriptions
- `GET /prescriptions` - Get own prescriptions (patient)
- `POST /prescriptions/add` - Create prescription (doctor only)

### Consultations
- `GET /consultations` - Get own consultations (patient)
- `POST /consultations/add` - Add consultation notes (doctor only)

### Appointments
- `POST /appointments/book` - Book appointment
- `GET /appointments/patient` - Get patient appointments
- `GET /appointments/doctor` - Get doctor appointments (doctor only)
- `PUT /appointments/:id/cancel` - Cancel appointment

## 🎯 Usage

### For Patients
1. Register/Login as a patient
2. View dashboard with tabs:
   - Medical Records: Upload/view medical documents
   - Prescriptions: See current medications
   - Consultations: View doctor notes
3. Book appointments with registered doctors

### For Doctors
1. Register/Login as a doctor with qualifications
2. Create prescriptions for patients
3. Add consultation notes
4. View scheduled appointments

## 🛡️ Security Features

- **JWT Authentication** with expiration
- **Password Hashing** using bcrypt
- **Rate Limiting** on API endpoints
- **CORS Protection**
- **Helmet** for HTTP security headers
- **Role-based Access Control**
- **Basic HIPAA Compliance** preparation

## 📱 Screenshots

*(Screenshots would be added here - the app has modern, professional UI)*

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Project Link: [https://github.com/younglord3302/medico](https://github.com/younglord3302/medico)

## 🙏 Acknowledgments

- React documentation
- Tailwind CSS community
- Medical industry best practices
- Open-source contributors

---

**Note:** This is a development-focused application. For production deployment, ensure HIPAA compliance with legal consultation, implement full security audit, and add payment/communication features.
