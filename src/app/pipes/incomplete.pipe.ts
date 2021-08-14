import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo/todo';


@Pipe({
  name: 'incomplete'
})
export class IncompletePipe implements PipeTransform {

  transform(todos: Todo[], showComplete: boolean): Todo[] {
    const incompletes: Todo[] = [];

    todos.forEach((todo)=>{
      if(!todo.completed){
        incompletes.push(todo);
      }
    });
    if(showComplete){
      return todos;
    }else{
    return incompletes;
    }
  }

}
