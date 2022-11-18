import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";
import "../../Containers/HashProvider";

import express from "express";
import cors from "cors";
import { configure, getLogger } from "log4js";
import { errors as celebrateErrors } from "celebrate";

import routes from "./Routes/index.routes";
import TypeORM from "../TypeORM";

configure(`./src/Shared/con`);

const app = express();
const port = process.env.APP_PORT || 4444;
const typeORM = new TypeORM();

typeORM.setup();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(celebrateErrors());

app.listen(port, () => {
  console.log(`Server Running On Port ${port}`);
});
