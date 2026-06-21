const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected 🚀"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Portfolio Backend Running 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});