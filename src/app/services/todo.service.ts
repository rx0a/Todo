import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Todo } from '../models//todo/todo';
import { DatePipe } from '@angular/common';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = 'http://localhost:8085/';
  private url = this.baseUrl + 'api/todos';

  private todos: Todo[] = [];

  // private todos: Todo[] = [
  //   new Todo(1, 'Go round mums', '', false),
  //   new Todo(2, 'Get Liz back', '', false),
  //   new Todo(3, 'Sort life out', '', false)
  // ];

  constructor(private http: HttpClient, private datePipe: DatePipe, private auth: AuthService) { }

    public index(): Observable<Todo[]> {
      return this.http.get<Todo[]>(this.url, this.getHttpOptions()).pipe(
          catchError((err: any) => {
            console.log(err);
            return throwError('KABOOM');
          })
        );
    }

    public show(todoId: any) {
        return this.http.get<Todo>(this.url + '/' + todoId, this.getHttpOptions())
          .pipe(
            catchError((err: any) => {
              console.log('TodoService.show(): error retrieving todo id ' + todoId);
              return throwError('KABOOM');
            })
          );
      }

public create(todo: Todo){
  console.log(todo);
  // todo.id = this.todos[this.todos.length - 1].id + 1;
  // this.todos.push(todo);
  // console.log(this.todos);
    const httpOptions = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    return this.http.post<Todo>(this.url, todo, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }
  handleError(error: any) {
    console.error('Something Broke');
    console.error(error.message);
    return throwError(error.json().error || 'Server Error');
  }

  destroy(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('TodoService.destroy(): error deleting todo');
        return throwError(err);
      })
    );
  }

 update(todo: Todo): Observable<Todo> {
    if (todo.completed) {
      todo.completeDate = this.datePipe.transform(Date.now(), 'shortDate');
    }
    else {
      todo.completeDate = '';
    }
    return this.http.put<Todo>(`${this.url}/${todo.id}`, todo, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('TodoService.update(): error updating todo');
        return throwError(err);
      })
    );
  }
// public destroy(id: number){
//   for (let index = 0; index < this.todos.length; index++) {
//     if(this.todos[index].id === id){
//       this.todos.splice(index, 1);
//     }
//   }
// }

getHttpOptions() {
  const credentials = this.auth.getCredentials();
  const httpOptions = {
    headers: new HttpHeaders ({
      'Content-type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': `Basic ${credentials}`
    }),
  };
   return httpOptions;
}
}


