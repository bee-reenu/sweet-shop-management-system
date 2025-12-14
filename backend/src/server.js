const app = require("./app");
const PORT = process.env.PORT || 4000;

app.use("/api/sweets", require("./routes/sweets"));

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
