const mongoose = require('mongoose');


const dbConnection = async() => {
    try {
        // await mongoose.connect('mongodb://localhost:27017/test');
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });

        console.log('Base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error( 'error al iniciar base de datos');
    }

}


module.exports = {
    dbConnection
}