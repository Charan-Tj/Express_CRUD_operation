import dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

let appdata = [];
let nextId = 1;

// CRUD operations

// Create - POST
app.post("/data", (req, res) => {
  const { name, price } = req.body; //body is used to get data from request body
  const newdata = {
    id: nextId++,
    name,
    price,
    description: "you will get it one day",
  };
  appdata.push(newdata);
  res.status(201).send(newdata);
});

// Read - GET
app.get("/list", (req, res) => {
  res.status(200).send(appdata);
});

// Read - GET by ID
app.get("/list/:id", (req, res) => {
  const item = appdata.find((t) => t.id === parseInt(req.params.id));

  if (!item) {
    return res.status(404).send("fuck you fill the items first");
  }
  res.status(200).send(item);
});

// Update - PUT
app.put("/list/:id", (req, res) => {
  const item = appdata.find((t) => t.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).send("Item not found");
  }

  const { name, price } = req.body;
  item.name = name;
  item.price = price;
  res.status(200).send(item);
});

// Delete - DELETE
app.delete("/list/:id", (req, res) => {
  const itemIndex = appdata.findIndex((t) => t.id === parseInt(req.params.id));
  if (itemIndex === -1) {
    return res.status(404).send("Item not found");
  }

  appdata.splice(itemIndex, 1);
  res.status(202).send("Deleted");
});

// Basic routes
app.get("/", (req, res) => {
  res.send("Hello from charan, Lets begin!");
});

app.get("/cherry", (req, res) => {
  res.send("you will do it!");
});

app.listen(PORT, () => {
  console.log(`Chod Server is running on http://localhost:${PORT}`);
});
