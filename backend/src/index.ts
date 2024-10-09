import express from "express";
import cors from "cors";
import connectDB from "./db/db";
import openaiRoutes from "./routes/openaiRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 6006;

connectDB();

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.use("/api", openaiRoutes);
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
