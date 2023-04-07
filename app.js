const express = require('express')
require('dotenv').config();
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

require('./config/dbconnect')
const port = process.env.PORT || 3000;
const bookRoute = require("./routes/book")
const authRoute = require("./routes/user");
const errhandler = require('./middlware/err');

app.use("/api/book", bookRoute)
app.use("/api/auth", authRoute);

app.use(errhandler)

app.listen(port, () => {
    console.log("server running on " + port)
})