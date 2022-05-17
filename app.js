const express = require('express');
const cors = require('cors');

//+ Error handling files
const AppError = require('./utils/appError'); // custom error class
const globalErrorHandler = require('./controllers/errorController'); // custom error handler

//+ Routes files
const userRouter = require('./routes/userRoutes');

// + Initialize express app
const app = express();

//++ for parsing application/json or application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
//app.use(express.json({ limit: '10kb' }));

//+ Cors
app.use(cors());

//++ static files
app.use(express.static('public'));

//+ Routes middleware
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.use('/api/users', userRouter);

//+ Route not found middleware
app.all('*', (req, res, next) => {
    next(new AppError(`Not found: ${req.originalUrl}`, 404));
});

//+ Error handling middleware
app.use(globalErrorHandler); // this is the last middleware

module.exports = app;
