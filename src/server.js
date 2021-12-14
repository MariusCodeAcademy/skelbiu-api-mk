require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

// const mysql = require('mysql2/promise');
// const dbConfig = require('./dbConfig');

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

// middleware
app.use(morgan('common'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello express');
});

app.post('/api/new-listing', upload.single('mainImage'), (req, res) => {
  console.log('req.body ===', req.body);
  console.log('req.file ===', req.file);
  res.json({ msg: 'image saved', data: req.file.filename });
});

const sampleRoutes = require('./routes/v1/sampleRoute');

app.use('/sample', sampleRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
