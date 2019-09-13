const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const formidable = require("formidable");
const PORT = 5000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/upload", (req, res) => {
  // console.log(req.body);
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    let data = JSON.parse(fields.json);
    let file = data.cv;
    var base64Data = file.replace(/^data:application\/pdf;base64,/, "");

    require("fs").writeFile("out.pdf", base64Data, "base64", function(err) {
      console.log(err);
    });
  });
});

app.post("/uploadform", (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    console.log(files);
    var oldpath = files.filetoupload.path;
    var newpath = __dirname + "/uploaded/" + files.filetoupload.name;
    fs.rename(oldpath, newpath, function(err) {
      if (err) throw err;
      res.write("File upload!");
      res.end();
    });
  });
});

http.listen(PORT, () => {
  console.log(`Server listen to http://localhost:${PORT}`);
});
