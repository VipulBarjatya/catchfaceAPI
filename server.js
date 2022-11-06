const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

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
  login: [
    {
      id: "987",
      hash: "",
      email: "john@gmail.com",
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  bcrypt.compare(
    "woofwoof",
    "$2a$10$TT4U4WhXGfJz7Ma2pUrO1OPCQti9iS4txQbVTjQBX9z/AQC5j9rse",
    function (err, res) {
      console.log("first guess is ", res);
    }
  );
  bcrypt.compare(
    "woof",
    "$2a$10$TT4U4WhXGfJz7Ma2pUrO1OPCQti9iS4txQbVTjQBX9z/AQC5j9rse",
    function (err, res) {
      console.log("second guess is ", res);
    }
  );
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("error logging in");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, null, null, (err, hash) => {
    console.log(hash);
  });
  database.users.push({
    id: "125",
    name: name,
    email: email,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json("not found");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json("not found");
  }
});
app.listen(3001, () => {
  console.log("server is running on port 3001");
});
