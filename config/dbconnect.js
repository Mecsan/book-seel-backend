const mongo = require('mongoose');
const connect = async () => {
    try {
        await mongo.connect(process.env.MONGO);
        console.log("db connected")
    }
    catch (e) {
        console.log("couldn't connect with db" + e.stack)
    }
}

connect();

