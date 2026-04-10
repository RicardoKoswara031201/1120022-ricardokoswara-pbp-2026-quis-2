import express from "express";
import postRoutes from "./routes/postroutes";
import commentRoutes from "./routes/commentroutes";

const app = express();
app.use(express.json());

app.use("/post", postRoutes);
app.use("/post-comment", commentRoutes);

export default app;