const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const ws = require("ws");
const connectDB = require("./Server/config/db");
const userRoutes = require("./Server/routes/userRoutes");
const port = process.env.PORT || 5000;

const jwtSecret = process.env.ACCESS_TOKEN_SECRET;

app.use(cors());
app.use(express());
app.use(express.json());
app.use(bodyParser.json());
connectDB();

// const verifyJWT = (req, res, next) => {
//   const authorization = req.headers.authorization;
//   if (!authorization) {
//     return res
//       .status(401)
//       .send({ error: true, message: "Unauthorized access" });
//   }
//   const token = authorization.split(" ")[1];

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//     if (err) {
//       return res
//         .status(401)
//         .send({ error: true, message: "Unauthorized access" });
//     }
//     req.decoded = decoded;
//     next();
//   });
// };

app.get("/", (req, res) => {
  res.send("Chat Application server Running");
});

app.use("/api", userRoutes);

// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const chats = require("./data/data");
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bioniru.mongodb.net/?retryWrites=true&w=majority`;
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     // await client.connect();

//     const chatCollection = client.db("chatDB").collection("chats");
//     const usersCollection = client.db("chatDB").collection("users");

//     // Send a ping to confirm a successful connection
//     // await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );

//     app.post("/jwt", (req, res) => {
//       const user = req.body;
//       const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
//         expiresIn: "1h",
//       });
//       res.send({ token });
//     });

//     app.get("/users", verifyJWT, async (req, res) => {
//       const result = await usersCollection.find().toArray();
//       res.send(result);
//     });

//     app.post("/users", async (req, res) => {
//       const user = req.body;
//       const query = { email: user.email };
//       const existingUser = await usersCollection.findOne(query);
//       if (existingUser) {
//         return res.send({ message: "User Already Exists" });
//       }
//       const result = await usersCollection.insertOne(user);
//       res.send(result);
//     });

//     app.all("*", (req, res) => {
//       res.status(404).send("Not Found");
//     });
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);
app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
