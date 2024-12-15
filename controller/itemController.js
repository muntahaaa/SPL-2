const multer = require('multer');
const Item = require('../db/models/item');
const catchAsync = require('../utils/catchAsync');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

const createItem = catchAsync(async (req, res, next) => {
  const { title, description, latitude, longitude, displayStatus, category, tags } = req.body;
  const mediaAttachment = req.file ? req.file.path : null;
  const createdBy = req.user.id;

  let parsedCategory;
  let parsedTags;

  try {
    parsedCategory = JSON.parse(category);
    parsedTags = JSON.parse(tags);
  } catch (error) {
    return res.status(400).json({ status: 'fail', message: 'Invalid JSON format for category or tags' });
  }

  const newItem = await Item.create({
    title,
    description,
    latitude,
    longitude,
    displayStatus,
    category: parsedCategory,
    tags: parsedTags,
    mediaAttachment,
    createdBy
  });

  return res.status(201).json({
    status: 'success',
    message: 'Item added successfully',
    data: newItem
  });
});

const getItems = catchAsync(async (req, res, next) => {
  const items = await Item.findAll();
  return res.status(200).json({
    status: 'success',
    data: items
  });
});
module.exports = { createItem, upload, getItems };