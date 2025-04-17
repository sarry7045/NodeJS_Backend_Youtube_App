const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const path = require("path")

const app = express();
const PORT = 8000;

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Hello from Middleware");
  req.myUserName = "Suraj.dev"; // Setting request for Future Uses
  next(); // It means my work is done, now you can move forward - Check the validations n all and give the permission to move forward
});
app.use((req, res, next) => {
  console.log("Hello from Middleware");
  console.log(req.myUserName); // If we set any request from middleware we can access anywhere after that middleware
  next(); // We can give multiple middleware's
});

app.get("/users", (req, res) => {
  return res.render("home")
});

app.get("/api/users", (req, res) => {
  res.setHeader("X-MyHeader", "Suraj Yadav");
  return res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user?.id === id);
  return res.json(user);
});
//   .patch((req, res) => {
//     return res.json({ status: "Pending" });
//   }).delete((req, res) => {
//     return res.json({ status: "Pending" });
//   });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "Success", id: users.length });
  });
});

app.listen(PORT, () => console.log("Server Started"));
