import cors from "cors";
import helmet from "helmet";
import express, { NextFunction, Router } from "express";
import elevatorRoutes from "./routes/elevatorRoutes";
import { initDatabase, rateLimiter } from "./utils";
import sequelize from "./models";

const app = express();
const router = Router();

// This is just an example route
router.get("/sample", (context) => {
  context.body = { message: "Hello world" };
  context.statusCode = 200;
});

app.use(cors());
// app.use(helmet());
app.use(rateLimiter);
app.use(express.json());
app.use("/api/v1", elevatorRoutes);

sequelize
  .sync()
  .then(async () => {
    initDatabase();
    console.log("In-memory database booted");
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server is live: ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.error("Unable to initialize database:", err);
  });

export default app;
