import { getLogger } from "log4js";
import { createConnection } from "typeorm";

import "./pollyfill";

const logger = getLogger("typeorm");

class TypeORM {
  public async setup(): Promise<void> {
    try {
      await createConnection();
      logger.info("Database connected successfuly");
    } catch (err) {
      logger.error("Database NOT connected successfuly", err);
    }
  }
}

export default TypeORM;
