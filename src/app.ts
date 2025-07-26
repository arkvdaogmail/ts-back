import express from "express";
import notarizeRoutes from "./routes/notarize";

const app = express();
app.use(express.json());

app.use("/api/notarize", notarizeRoutes);

// ...your other routes

export default app;
