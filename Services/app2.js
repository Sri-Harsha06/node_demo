import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();
app.use(express.json());
app.use(cors());
const url =
  "mongodb+srv://project:nodejs@cluster0.9gqqmkx.mongodb.net/?retryWrites=true&w=majority";
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/find", async (req, res) => {
  const username = req.body.id;
  //   console.log(req.body.id);
  //   console.log(username);
  //   console.log(typeof username);
  const client = new MongoClient(url);
  try {
    const database = client.db("companyProfile");
    const userProfile = database.collection("userProfile");
    const query = { username };
    const result = await userProfile.find(query);
    var array = [];
    await result.forEach((data) => {
      array.push(data);
    });
    res.send(array.length > 0 ? true : false);
  } finally {
    client.close();
  }
  //   res.json({message:'done'});
});

app.post("/getdata", async (req, res) => {
  //   console.log(req.body.id);
  const username = req.body.id;
  const client = new MongoClient(url);
  try {
    const database = client.db("companyProfile");
    const userProfile = database.collection("userProfile");
    const query = { username };
    const result = await userProfile.find(query);
    var array = [];
    await result.forEach((data) => {
      array.push(data);
    });
    // console.log(array[0]);
    res.send(array[0]);
  } finally {
    client.close();
  }
});
app.post("/userdata", async (req, res) => {
  // console.log(req.body);
  const client = new MongoClient(url);
  const database = client.db("companyProfile");
  const userProfile = database.collection("userProfile");
  const username = req.body.id;
  const new_user = {
    username: req.body.id,
    professionSkills: req.body.TechSkills,
    workSkills: req.body.WorkedSkills,
    experience: req.body.Experience,
    roles: req.body.Role,
    foodHabbits: req.body.foodtype,
    shirtSize: req.body.shirtsize,
    sports: req.body.sports,
    talents: req.body.talents,
    worktype: req.body.worklocation,
  };
  //   console.log(new_user);
  try {
    const result = await userProfile.find({ username });
    var array = [];
    await result.forEach((data) => {
      array.push(data);
    });
    if (array.length === 0) {
      await userProfile.insertOne(new_user);
      res.send({ message: "user details registered sucesfully!!" });
    } else {
      await userProfile.updateMany({ username: username }, { $set: new_user });
      res.send({ message: "user details updated sucesfully!!" });
    }
  } finally {
    client.close();
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
