const express = require("express");
const app = express();
const connectdb = require("./config/db");
const footballerRoute = require("./router/footballerRoute");
const authRoute = require("./router/authRouter");

// Middleware
app.use(express.json());

// Connect to Database
connectdb();

// Routes
app.use("/api/v1", footballerRoute);
app.use("/auth", authRoute);

app.get("/", (req, res) => {
    res.status(200).send("Server is working");
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});