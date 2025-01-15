import { LocationsHandler } from "./locations-handler";
import { TodosHandler } from "./todos-handler";


export const handlers = [...TodosHandler, ...LocationsHandler];
