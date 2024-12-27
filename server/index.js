const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./utils/db");
const router = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();
connectDB();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on PORT : ${port}`);
});
