require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


app.use(express.json());
app.use(cors()); 


mongoose
  .connect("mongodb://127.0.0.1:27017/db-argo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

const Argo = require("./model/Argo");


app.get("/argos", async (req, res) => {
  try {
    const argos = await Argo.find();
    res.json(argos);
  } catch (err) {
    console.error(err);
  }
});

app.post("/argos/new", (req, res) => {
  console.log("REG", req.body)
  const argo = new Argo({
    argo: req.body.argo,
  });

  argo.save();
  res.json(argo);
});




app.listen(8080);
