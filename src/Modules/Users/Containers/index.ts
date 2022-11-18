import { container } from "tsyringe";

import IUsersRepository from "../Repositories/IUsersRepository";
import UsersRepository from "../Infra/TypeORM/Repositories/UsersRepositories";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
