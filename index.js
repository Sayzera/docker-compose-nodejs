const express = require("express")
const mongoose = require("mongoose")
const app = express()
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config")

const port = process.env.PORT || 3000

// .connect("mongodb://admin:admin@192.168.128.2:27017/?authSource=admin")
//  docker inspect  docker-node-mongo-1 detaylı aramadan ip vs bilgilerine ulaşılabilir.

const MongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
mongoose
  .connect(MongoURL)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB")
  })

app.get("/", (req, res) => {
  res.send("Hello dadasdasd" + process.env.PORT)
})

app.listen(port, () => {
  console.log("Server is up on port " + port)
})
