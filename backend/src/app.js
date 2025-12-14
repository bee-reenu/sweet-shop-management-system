const express = require("express");
const app = express();

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/sweets", require("./routes/sweets"));

app.get("/", (req, res) => {
  res.send("API running");
});

module.exports = app;
