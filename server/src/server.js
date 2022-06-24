require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const connectDb = require("./config/connectDb");
const passportConfig = require("./config/passport");
const isAuth = require("./middleware/isAuth");
const { PORT, ONE_DAY_IN_MS, IS_PROD } = require("./config/constants");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

connectDb();

passportConfig(passport);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: IS_PROD ? "none" : "lax",
      secure: IS_PROD,
      maxAge: ONE_DAY_IN_MS,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () =>
  console.info(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
