const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

// middlewars
app.use(express.json());

// import routes
const authRoute = require('./routes/auth');
const invoicesRoute = require('./routes/invoices');

// route middlewares
app.use('/api/user', authRoute);
app.use('/api/invoices', invoicesRoute);

// connect to db
mongoose.connect(
    process.env.DB_CONNECT,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('Connected to DB')
);

app.listen(3000, () => console.log('Server running on 3000'));