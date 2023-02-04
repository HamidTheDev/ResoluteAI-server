const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const Port = process.env.Port || 5000;

const uri =
  "mongodb+srv://hamidthedev:hamidthedev@cluster0.srwkfcj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const collection = client.db("student").collection("students");

app.post("/add", async (req, res) => {
  const body = req.body;
  const result = await collection.insertOne(body);
  res.send(result);
});
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await collection.deleteOne({ _id: ObjectId(id) });
  res.send(result);
  // console.log(id);
});

app.get("/students", async (req, res) => {
  const data = collection.find({});
  const arr = await data.toArray();
  // const user = arr.filter(p => p.user==="Hamid")
  // console.log(user)
  res.send(arr);
});

app.put("/update/:id", async (req, res) => {
  const id = req.params.id;

  console.log(id);
  const query = { _id: ObjectId(id) };
  const option = {
    upsert: true,
  };
  const newData = {
    $set: {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      class: req.body.class,
      division: req.body.division,
      roll: req.body.roll,
      address1: req.body.address1,
      address2: req.body.address2,
      landmark: req.body.landmark,
      city: req.body.city,
      pincode: req.body.pincode,
    },
  };
  const result = collection.updateOne(query, newData, option);
  res.send(result);
});

app.listen(Port, () => {
  console.log("Listenin on port", Port);
});
