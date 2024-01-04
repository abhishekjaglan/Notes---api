const express = require("express");
const connectDb = require("./Config/dbConnect");
const errorHandler = require("./Middleware/errorHandler");
const { limiter, speedLimiter } = require("./Middleware/rateLimiter");
const dotenv = require("dotenv").config()

connectDb();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(limiter);
app.use(speedLimiter);

app.use('/api/auth',require('./Routes/userRoute'));
app.use('/api/notes', require('./Routes/noteRoute'));
app.use('/api', require('./Routes/searchRoute'));
app.use(errorHandler);

app.listen(port, (req,res) => {
    console.log(`Server running at port ${port}`);
});
