require("dotenv").config();
const express = require("express");
const app = express();
const connectdb = require("./config/db");
const catRoute = require("./router/catRoute");
const authRoute = require("./router/authRouter");
const passport = require("passport");

// Middleware
app.use(express.json());

app.use(passport.initialize());
require("./config/passport")(passport);

// Connect to Database
connectdb();

// Routes
app.use("/api/v1", catRoute);
app.use("/auth", authRoute);

app.get("/", (req, res) => {
    res.status(200).send("Server is working");
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});