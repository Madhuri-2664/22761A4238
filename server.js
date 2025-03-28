const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

let users = [
    { "id": 1, "name": "John Doe" },
    { "id": 2, "name": "Jane Doe" }
];

// GET /users
app.get("/users", (req, res) => {
    res.json(users);
});

// POST /users (Allow Adding Users)
app.post("/users", (req, res) => {
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    res.status(201).json(newUser);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
