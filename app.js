const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
require("dotenv").config();


const MailController = require('./mail.controller');
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        credentials: true,
        exposedHeaders: "x-access-token",
    })
);

app.use("/api/", MailController);


app.use("/", (req, res) => {
    res.status(200).send("Home Page!");
});
const PORT = process.env.PORT || 3003;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));