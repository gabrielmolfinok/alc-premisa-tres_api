const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Habilitar PUBLIC folder
app.use(express.static(path.resolve(__dirname, "../public")));

// Allow CORS requests
const allowCrossDomain = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};
app.use(allowCrossDomain);
app.use(cors());

// Rutas
app.use(require("./routes"));

// Escucha del puerto
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening: ${PORT}`));

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://gabriel:gabriel@alc-osqlh.mongodb.net/jokes?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log(`Database connected`);
  } catch (error) {
    console.error(error);
  }
};
connectDB();
