const express = require("express")
const mongoose = require("mongoose")
const app = express()
const session = require("express-session")
const redis = require("redis")
const RedisStore = require("connect-redis").default

let redisClient = redis.createClient({
  legacyMode: true,

  socket: {
    host: process.env.REDIS_URL || "redis",
    port: process.env.REDIS_PORT || "6379",
  },
})
redisClient
  .connect()
  .then(() => console.log("Connected to Redis"))
  .catch((err) => console.log(err))

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
})

app.use(
  session({
    store: redisStore,
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure: false,
      resave: true,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 30000,
    },
  })
)
app.use(express.json())

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config")

const port = process.env.PORT || 3000
const connectWithRetry = () => {
  const MongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
  mongoose
    .connect(MongoURL)
    .then(() => {
      console.log("Connected to MongoDB")
    })
    .catch((err) => {
      console.log(e)
      setTimeout(connectWithRetry, 5000)
    })
}

// .connect("mongodb://admin:admin@192.168.128.2:27017/?authSource=admin")
//  docker inspect  docker-node-mongo-1 detaylı aramadan ip vs bilgilerine ulaşılabilir.
connectWithRetry()

const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoutes")

app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)

app.listen(port, () => {
  console.log("Server is up on port " + port)
})
