require('dotenv').config();
const cors = require('cors');
const express = require('express');

// connect db
const connect = require('./db/connect');

// my app
const app = express();
app.use(express.json());
app.use(cors());

// port
const port = process.env.PORT || 3000;

//router
const authRoute = require('./routes/authRoute');
const courseRoute = require('./routes/courseRoute');

// error handler
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

// middleware
const authenticated = require('./middleware/authenticated');

// routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/course', authenticated ,courseRoute);

app.use(notFound);
app.use(errorHandler);

// start
const start = async () => {
    try {
        await connect(process.env.MONGO_URI);
        app.listen(
            port, 
            console.log(`Sever is listening on port ${port}`)
        );
        console.log('connect successfully!!!');
    } catch (error) {
        console.log(error)
    }
}

start();
