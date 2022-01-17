const express = require("express");
const corsMiddleWare = require("cors");


const { PORT } = require("./config/constants");

// Create an express app
const app = express();






app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
  