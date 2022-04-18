const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
// Import Routes
const authRoutes = require('./routes/auth');

// environment varialbles
dotenv.config({ path: './config/config.env' });

connectDB();

// init app
const app = express();

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
    res.send("djwdwehl");
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => { console.log('server running.... at ' + PORT); })
