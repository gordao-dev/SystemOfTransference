import { Router } from "express";

import usersRoutes from "Modules/Users/Infra/Http/Routes/index.routes";
const routes = Router();

routes.use("/users", usersRoutes);

export default routes;
