import dotenv from "dotenv";
import express  from "express";
import cors from "cors";
import router from "./routes/routes.index";

dotenv.config();

export const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(process.env.PORT || 5000);
console.log(`Listening  at ${process.env.PORT}`);


