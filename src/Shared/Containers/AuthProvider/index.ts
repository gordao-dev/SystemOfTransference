import { container } from "tsyringe";

import AuthConfig from "./Config/AuthConfig";
import JWTAuthProvider from "./Implementations/JWTAuthProvider";
import IAuthProvider from "./Models/IAuthProvider";

const drivers = {
  jwt: JWTAuthProvider,
};

container.registerSingleton<IAuthProvider>(
  "AuthProvider",
  drivers[AuthConfig.driver]
);
