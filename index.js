const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const PORT = 5000;
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

http.listen(PORT, () => {
  console.log(`Server listen to http://localhost:${PORT}`);
});
