const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./utils/db");
const router = require("./routes");
const cors = require("cors");

const app = express();
dotenv.config();
connectDB();

const corsOptions = {
  origin: "https://todo-app-frontend-alpha.vercel.app",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", router);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on PORT : ${port}`);
});
