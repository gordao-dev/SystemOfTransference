import "reflect-metadata";

export const VIRTUAL_COLUMN_KEY = Symbol("VIRTUAL_COLUMN_KEY");

export function VirtualColumn(name?: string): PropertyDecorator {
  return (target, propertKey) => {
    const metaInfo = Reflect.getMetadata(VIRTUAL_COLUMN_KEY, target) || {};

    metaInfo[propertKey] = name ?? propertKey;

    Reflect.defineMetadata(VIRTUAL_COLUMN_KEY, metaInfo, target);
  };
}
