const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const routers = require("./api/routers");

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

//Import Middlewares
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

//Import Routes
app.use("/api", routers);

//Error Middleware
app.use(errorHandler);

function errorHandler(err, req, res, next) {
  console.log("Error: ", err);
  res.status(500).json({ message: "An unexpected error has occurred" });
}

app.listen(PORT, () =>
  console.log(`Server is up and running on PORT: ${PORT}`)
);
