const express = require("express");
const cors = require("cors");

const connectDb = require("./config/connectDb");
const { PORT } = require("./config/constants");

const app = express();

connectDb();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.get("/", (_req, res) => res.json({ message: "Hello World" }));

app.listen(PORT, () =>
  console.info(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
