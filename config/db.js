const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const connectDB = async () => {

    if (mongoose.connections[0].readyState) {
        console.log('Already connected to DB.');
        return;
    }
    try {
        conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        mongoose.connection.on('disconnected', () => {
            console.log('DB Disconnected.');
        })

        process.on("SIGINT", async () => {
            await conn.close();
            process.exit(0);
        })

        console.log("DB Connected : " + conn.connection.host);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;