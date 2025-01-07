import { locationHandlers } from './locations-handler';
import { todosHandlers } from './todos-handler';

export const handlers = [...locationHandlers, ...todosHandlers];
