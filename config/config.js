module.exports = {
  MONGO_IP: process.env.MONGO_IP || "mongo",
  MONGO_PORT: process.env.MONGO_PORT || "27017",
  MONGO_USER: process.env.MONGO_USER || "admin",
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || "admin",
  MONGO_DB: process.env.MONGO_DB || "admin",
  PORT: process.env.PORT || 3000,
}
