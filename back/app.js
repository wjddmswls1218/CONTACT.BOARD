const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const PORT = 3000;
const app = express();

app.use(morgan(`dev`));
app.use(cors());

app.listen(PORT, () => {
  console.log(`${PORT} Talk To Me Backend Server Start`);
});
