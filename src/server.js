require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

// const mysql = require('mysql2/promise');
// const dbConfig = require('./dbConfig');

const PORT = process.env.PORT || 3000;

const app = express();

// middleware
app.use(morgan('common'));
app.use(cors());
app.use(express.json());

app.use('/skelbiu-img', express.static(path.resolve('public', 'uploads')));

app.get('/', (req, res) => {
  res.send('Hello express');
});

app.get('/testing', (req, res) => {
  res.send({ msg: 'success', data: [1, 2, 3] });
});

const listingsRoutes = require('./routes/v1/listing');

app.use('/', listingsRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
