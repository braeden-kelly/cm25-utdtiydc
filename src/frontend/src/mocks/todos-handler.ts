import { HttpResponse, delay, http } from 'msw';
import todosMinimal from './jsonplaceholder.typicode.com/todos-minimal.json';
export const TodosHandler = [
  http.get('https://jsonplaceholder.typicode.com/todos', async () => {
    await delay(2000);
    // return new HttpResponse(null, {
    //   status: 404,
    //   statusText: 'Not Found',
    // });
    return HttpResponse.json(todosMinimal);
  }),
];
