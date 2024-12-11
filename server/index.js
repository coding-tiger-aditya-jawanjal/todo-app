const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./utils/db");
const router = require("./routes");
const cors = require("cors");

const app = express();
dotenv.config();
connectDB();

const cors = require("cors");
app.use(cors({ origin: "https://todo-app-q4uh.vercel.app" }));
app.use(express.json());
app.use("/api", router);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on PORT : ${port}`);
});
