const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// ===== Models =====
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
const User = mongoose.model('User', userSchema);

const candidateSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  jobTitle: String,
  status: { type: String, default: 'Pending' },
  resumeUrl: String
});
const Candidate = mongoose.model('Candidate', candidateSchema);

// ===== Middleware =====
const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'No token, access denied' });
  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(400).json({ msg: 'Invalid token' });
  }
};

// ===== Multer Setup =====
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype !== 'application/pdf') {
    cb(new Error('Only PDF files allowed'), false);
  } else cb(null, true);
};
const upload = multer({ storage, fileFilter });

// ===== Routes =====

// --- Auth ---
app.post('/auth/register', async (req, res) => {
  const { username, password } = req.body;
  const exists = await User.findOne({ username });
  if (exists) return res.status(400).json({ msg: 'User already exists' });

  const hash = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hash });
  await newUser.save();
  res.json({ msg: 'User registered' });
});

app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { id: user._id, username: user.username } });  // Return user data
});

// --- Candidates ---
app.post('/candidates', auth, upload.single('resume'), async (req, res) => {
  const { name, email, phone, jobTitle } = req.body;

  const emailRegex = /^\S+@\S+\.\S+$/;
  const phoneRegex = /^[0-9]{10}$/;
  if (!emailRegex.test(email)) return res.status(400).json({ msg: 'Invalid email' });
  if (!phoneRegex.test(phone)) return res.status(400).json({ msg: 'Invalid phone number' });

  const resumeUrl = req.file ? `${process.env.BASE_URL}/uploads/${req.file.filename}` : '';
  const candidate = new Candidate({ name, email, phone, jobTitle, resumeUrl });
  await candidate.save();
  res.json(candidate);
});

app.get('/candidates', auth, async (req, res) => {
  const candidates = await Candidate.find();
  res.json(candidates);
});

app.put('/candidates/:id/status', auth, async (req, res) => {
  const { status } = req.body;
  if (!['Pending', 'Reviewed', 'Hired'].includes(status))
    return res.status(400).json({ msg: 'Invalid status' });

  const updated = await Candidate.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(updated);
});

app.delete('/candidates/:id', auth, async (req, res) => {
  await Candidate.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Candidate deleted' });
});

// --- Metrics ---
app.get('/candidates/metrics/stats', auth, async (req, res) => {
  const total = await Candidate.countDocuments();
  const pending = await Candidate.countDocuments({ status: 'Pending' });
  const reviewed = await Candidate.countDocuments({ status: 'Reviewed' });
  const hired = await Candidate.countDocuments({ status: 'Hired' });
  res.json({ total, pending, reviewed, hired });
});

// ===== Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
