const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const formidable = require("formidable");
const PORT = 5000;
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.post("/upload", (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    console.log(files);
    var oldpath = files.cv.path;
    var newpath = __dirname + "/uploaded/" + files.cv.name;
    fs.rename(oldpath, newpath, function(err) {
      if (err) throw err;
      res.sendStatus(200);
      res.end();
    });
  });
});

http.listen(PORT, () => {
  console.log(`Server listen to http://localhost:${PORT}`);
});
