import {http, delay, HttpResponse} from 'msw'
import todos from './jsonplaceholder.typicode.com/todos-empty.json'
export const TodosHandler = [
http.get('https://jsonplaceholder.typicode.com/todos', async () => {
    
    return HttpResponse.json(todos)
    return new HttpResponse(null, { status: 401, statusText: 'You Have To Log In'})
})
]