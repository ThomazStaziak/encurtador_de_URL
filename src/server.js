require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");

const app = express();

const server = http.createServer(app);

mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(require("./routes"));

server.listen(
  process.env.PORT,
  console.log(`Listening on port ${process.env.PORT}`)
);
