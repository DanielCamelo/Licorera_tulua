const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('conectado a la base de datos de MongoDB');
    }catch(err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;