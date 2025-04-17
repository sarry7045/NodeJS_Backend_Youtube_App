const fs = require("fs");
const os = require("os");
const http = require("http");
const url = require("url");

fs.writeFileSync("./text.txt", "Hello World");
// fs.writeFile("./text.txt", "Hello World")

const contact = fs.readFileSync("./contact.txt", "utf-8");
console.log("contact", contact);
// Sync task can store the value in variable

// and in async we have to call callback function
// async cannot return anything
fs.readFile("./contact.txt", "utf-8", (err, result) => {
  if (err) {
    console.log("error", err);
  } else {
    console.log("Result", result);
  }
});
fs.appendFileSync("./text.txt", new Date().getDate().toLocaleString());

console.log(fs.statSync("./text.txt"));
console.log("System", os.cpus().length);

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()}: ${req.url} New Req Recevied\n`;
  console.log("URL", url.parse(req.url, true));
  fs.appendFile("log.txt", log, (err, data) => {
    res.end("Hello from the Server");
  });
});

myServer.listen(8000, () => console.log("Server Started"));
