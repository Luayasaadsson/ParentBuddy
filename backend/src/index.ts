import express from "express";
import cors from "cors";
import connectDB from "./db/db";
import activityRoutes from "./routes/activityRoutes";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 6006;

connectDB();

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.use("/api", activityRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
