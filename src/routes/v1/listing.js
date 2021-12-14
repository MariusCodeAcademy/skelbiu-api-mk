const express = require('express');
// const { upload } = require('../../utils/multerHelper');
const router = express.Router();

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

router.post('/api/new-listing', upload.single('mainImage'), (req, res) => {
  console.log('req.body ===', req.body);
  console.log('req.file ===', req.file);
  // if (req.file.size >= 500000) {
  //   res.status(400).json({ error: 'Too big' });
  // }
  res.json({ msg: 'image saved', data: req.file.filename });
});

module.exports = router;
