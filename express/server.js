// server page using express and node.js. it accepts post and get requests to manage information.
const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.post("/info", (req, res) => {
  console.log("Received POST request to /info");
  console.log("Received data:", req.body);

  if (
    req.body.altitude === undefined ||
    req.body.HIS === undefined ||
    req.body.ADI === undefined
  ) {
    console.log("Invalid data received");
    return res.status(400).send("Invalid data");
  }

  fs.writeFile("info.json", JSON.stringify(req.body), (err) => {
    if (err) {
      console.log("Failed to save data");
      return res.status(500).send("Failed to save");
    }
    console.log("Data saved successfully");
    res.status(200).send("Success");
  });
});

app.get("/info", (req, res) => {
  console.log("Received GET request to /info");
  fs.readFile("info.json", (err, data) => {
    if (err) {
      console.log("Failed to read data");
      return res.status(500).send("Failed to read");
    }
    console.log("Data read successfully");
    res.status(200).send(data.toString());
  });
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
