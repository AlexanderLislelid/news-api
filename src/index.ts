import "dotenv/config";
import express from "express";
import authRoutes from "./routes/auth.js";
import articleRoutes from "./routes/articles.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/articles", articleRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
