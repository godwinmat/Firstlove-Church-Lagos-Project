import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import userRoutes from "./routers/userRoutes.js";

const app = express();
const PORT = 5060;

const uri = "mongodb://localhost:27017/flcldata";

mongoose.connect(uri, {
    useNewUrlParser: true
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Welcome to the HomePage.")
})

app.use("/user", userRoutes)

app.listen(PORT, () => {
    console.log(`Listening at localhost:${PORT}`)
})