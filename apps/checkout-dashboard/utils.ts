import { Node } from "types";

export const getById = (idToCompare: string) => (obj: Node) =>
  obj.id === idToCompare;

export const findById = (objList: Node[], idToCompare: string) =>
  objList.find(getById(idToCompare));
