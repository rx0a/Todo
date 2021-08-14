import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Todo } from 'src/app/models/todo/todo';
import { IncompletePipe } from 'src/app/pipes/incomplete.pipe';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  title: string = 'ngTodo';
  showComplete: boolean = false;

  constructor(private todoService: TodoService,
    private datePipe: DatePipe,
    private incompletePipe: IncompletePipe,
    private currentRoute: ActivatedRoute,
    private router: Router) { }

  todos: Todo[] = [];

  newTodo: Todo = new Todo();

  checkTodoNum(): string{
    if (this.getTodoNum() > 9){
      return 'badge bg-danger';
    }
    else if (this.getTodoNum() < 5){
      return 'badge bg-success';
    }
    else {
      return 'badge bg-warning';
    }
  }

  getTodoNum(): number{
      return this.incompletePipe.transform(this.todos, false).length;
  }

  selected: Todo | null = null;
  editTodo: Todo | null = null;

  ngOnInit(): void {
    let idString = this.currentRoute.snapshot.paramMap.get('id');
   if(!this.selected && idString){
      this.todoService.show(idString).subscribe(
        todo => {
          this.selected = todo;
        },
        fail => {
          console.error('Invalid todo ID ' + idString);
          this.router.navigateByUrl('badTodoId');
        }
      );
   } else{
     this.reload();
   }
  }

  reload(){
    this.todoService.index().subscribe(
      data => this.todos = data,
      err => console.error('Observer got an error in reload: ' + err)
    )
  }

  displayTodo(todo: Todo): Todo {
    this.selected = todo;
    return this.selected;
  }

  displayTable(){
    this.selected = null;
  }

  addTodo(){
  console.log(this.newTodo);
    this.todoService.create(this.newTodo).subscribe(
      data => {
        this.reload();
        this.newTodo = new Todo();

      },
      err => console.error('Observer got an error in addTodo: ' + err)
      );

  }

  setEditTodo() {
    this.editTodo = Object.assign({}, this.selected);
  }

  cancelEditTodo(){
    this.editTodo = null;
  }

  updateTodo(todo: Todo){
this.todoService.update(todo).subscribe(data => {
  console.log(todo.completeDate);
  this.reload();
});
this.cancelEditTodo();
this.displayTable();
  }

  deleteTodo(id: number){
    console.log(id);
     this.todoService.destroy(id).subscribe(data => {
       console.log(data);
       this.reload();
     });
  }

}
