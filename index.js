const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/privateroute");




dotenv.config();

mongoose.connect(process.env.MONGO_URI, () => {

    console.log("DATABASE is connected!");
});



app.use(express.json());
app.use("/api/user", authRoute);
app.use('/api/privatepost', postRoute);
app.get("/", (req, res) => {

    res.send("SIDDHARTH TANWAR IS HERE");
})




const port = process.env.PORT;
app.listen(port, () => console.log("SERVER IS UP AND RUNNING!"));