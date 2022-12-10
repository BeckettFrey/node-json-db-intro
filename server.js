const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.listen(3000);

app.get("/", (req, res) => {
  fs.readFile("./data.json", "utf-8", (error, data) => {
    res.send(data);
  });
});
app.get("/", (req, res) => {
  console.log("madeit");
  res.send("getter");
});
app.post("/change", (req, res) => {
  const resultsData = req.query.newData;
  writeFile("./data.json", resultsData);
  res.send(resultsData);
});

function writeFile(fileN, data) {
  fs.writeFileSync(fileN, data);
}
const loginRouter = require("./routes/login");
app.use("/login", loginRouter);
//fs.writeFileSync("data.json", JSON.stringify(["apple", true, false]));
