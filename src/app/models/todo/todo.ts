export class Todo {

  id: number;
  task: string;
  description: string;
  completed: boolean;
  completeDate: any;

  constructor(
    id: number = 0,
  task: string = '',
  description: string = '',
  completed: boolean = false,
  completeDate = ''
  ){
    this.id = id;
    this.task = task;
    this.description = description;
    this.completed = completed;
    this.completeDate = completeDate;
  }


}
