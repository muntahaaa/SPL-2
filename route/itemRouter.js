const express = require('express');
const itemRouter = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const { createItem, upload, getItems } = require('../controller/itemController');
const protect = require('../middleware/authMiddleware');

//itemRouter.post('/', protect, upload.single('mediaAttachment'), createItem);
itemRouter.use(bodyParser.json());
itemRouter.use(cors());

itemRouter.post('/', protect, upload.single('mediaAttachment'), createItem);
itemRouter.get('/', protect, getItems);
module.exports = itemRouter;