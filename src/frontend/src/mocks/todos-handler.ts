import { http, HttpResponse } from 'msw';
import todosjson from './jsonplaceholder.typicode.com/todos.json';
export const todosHandlers = [
  http.get('http://someapi/api/todos', async () => {
    return HttpResponse.json(todosjson.filter((t) => t.userId === 1));
  }),
];
