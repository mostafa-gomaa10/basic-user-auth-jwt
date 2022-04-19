const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
// Import Routes
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');

// environment varialbles
dotenv.config({ path: './config/config.env' });

connectDB();

// init app
const app = express();
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3178",
    })
);

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes)
app.use('/posts', postsRoutes)

app.get('/', (req, res) => {
    res.send("djwdwehl");
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => { console.log('server running.... at ' + PORT); })
