import {
  ChangeDetectionStrategy,
  Component,
  computed,
  resource,
} from '@angular/core';

@Component({
  selector: 'app-todos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>Todos</p>
    @if (todosResource.error()) {
      <p>There was an error getting your Todo list - Sorry. Try Again later?</p>
    } @else {
      @if (todosResource.isLoading()) {
        <p>Getting your todo list... hang tight!</p>
      } @else {
        <div class="backdrop-brightness-125">
          <div class="grid grid-cols-4 gap-4">
            @for (todo of todoListIncomplete(); track todo.id) {
              <div
                class="w-30  m-4 bg-green-200 p-4 drop-shadow-lg border-green-800 border-2 rounded-md h-16 flex"
              >
                <p
                  title="{{ todo.title }}"
                  class="text-green-800 font-bold truncate capitalize "
                >
                  {{ todo.title }}
                </p>
              </div>
            } @empty {
              <p>Good work! Nothing To Do!</p>
            }
          </div>
          <div class="grid grid-cols-4 gap-4">
            @for (todo of todoListCompleted(); track todo.id) {
              <div
                class="w-30  m-4 bg-slate-300-200 p-4 drop-shadow-lg border-green-800 border-2 rounded-md h-16 flex"
              >
                <p
                  title="{{ todo.title }}"
                  class="text-slate-400 font-bold truncate capitalize "
                >
                  {{ todo.title }}
                </p>
              </div>
            } @empty {
              <p>No todos that are completed.</p>
            }
          </div>
        </div>
      }
    }
  `,
  styles: ``,
})
export class TodosComponent {
  todosResource = resource<
    { id: string; title: string; completed: boolean }[],
    unknown
  >({
    loader: () =>
      fetch('https://jsonplaceholder.typicode.com/todos').then((t) => t.json()),
  });

  todoListCompleted = computed(() => {
    if (this.todosResource.hasValue()) {
      return this.todosResource.value()?.filter((t) => t.completed === true);
    } else {
      return [];
    }
  });
  todoListIncomplete = computed(() => {
    if (this.todosResource.hasValue()) {
      return this.todosResource.value()?.filter((t) => t.completed === false);
    } else {
      return [];
    }
  });
}
