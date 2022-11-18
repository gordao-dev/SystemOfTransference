import "reflect-metadata";
import { SelectQueryBuilder } from "typeorm";
import { VIRTUAL_COLUMN_KEY } from "./Decorators/VirtualColumn";

declare module "typeorm" {
  interface SelectQueryBuilder<Entity> {
    getMany(this: SelectQueryBuilder<Entity>): Promise<Entity[] | undefined>;
    getOne(this: SelectQueryBuilder<Entity>): Promise<Entity | undefined>;
  }
}

SelectQueryBuilder.prototype.getMany = async function () {
  const { entities, raw } = await this.getRawAndEntities();

  const items = entities.map((entity, index) => {
    const metaInfo = Reflect.getMetadata(VIRTUAL_COLUMN_KEY, entity) ?? {};

    const item = raw[index];

    for (const [propertKey, name] of Object.entries<string>(metaInfo)) {
      entity[propertKey] = item[name];
    }

    return entity;
  });

  return [...items];
};

SelectQueryBuilder.prototype.getOne = async function () {
  const { entities, raw } = await this.getRawAndEntities();
  if (!entities || !entities.length) {
    return undefined;
  }

  const metaInfo = Reflect.getMetadata(VIRTUAL_COLUMN_KEY, entities[0]) ?? {};

  for (const [propertKey, name] of Object.entries<string>(metaInfo)) {
    entities[0][propertKey] = raw[0][name];
  }

  return entities[0];
};
