const express = require("express");
const app = express();

app.use(express.json());
const database = {
  users: [
    {
      id: "123",
      name: "Vipul",
      email: "vipul@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Vidhi",
      email: "vidhi@gmail.com",
      password: "chocolates",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send(`<h1>this is working</h1>`);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("error logging in");
  }
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
