require('dotenv').config({ path: `${process.cwd()}/.env` });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./route/authRouter');
const itemRouter = require('./route/itemRouter');
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');


// Load environment variables
//dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// All routers
app.use('/api/v1/', authRouter);
app.use('/api/v1/items', itemRouter);


// 404 Middleware

app.use('*', catchAsync(async(req, res,next) => {
    throw new AppError('This is an invalid route', 404);
}));

app.use(globalErrorHandler);

// Start the server
const PORT = process.env.APP_PORT || 3000; // Default to 3000 if APP_PORT is not set
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
