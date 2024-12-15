const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = express.Router();
const {SignUp, login} = require('../controller/authController');

authRouter.use(cors());
authRouter.use(bodyParser.json());
// Define the POST route for sign-up
authRouter.post('/signup', SignUp);

authRouter.post('/login', login);

module.exports = authRouter;