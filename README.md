# Todo App
This is an over-engineered todo application with its backend running in a Tomcat Server with Java Spring Framework, the frontend is using Angular Framework. In addition to being very dynamic and fast; it allows for multiple users working on their todo lists simultaneously. User authentication is done through Spring Security.

## Technologies Used

* [Angular](https://angular.io/)</br>
* [Java](https://en.wikipedia.org/wiki/Java_)</br>
* [Javascript](https://www.javascript.com/)</br>
* [Object-Oriented design](https://stackabuse.com/object-oriented-design-principles-in-java)</br>
* [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer)<br>
* [Spring Framework](https://en.wikipedia.org/wiki/Spring_Framework#Spring_Boot)<br>
* [MySQL](https://www.mysql.com/)</br>
* [Git](https://git-scm.com/)</br>
* [Eclipse](https://www.eclipse.org/ide/)</br>

## REST Endpoints

| Return Type   | Route                           | Functionality              |
|:--------------|:--------------------------------|----------------------------|
|`List<Todo>`   | `GET api/todos`                 | Retrieves all todos        |
|`List<Todo>`   | `GET api/todos/{id}`            | Retrieves todos by id      |
|`Todo`         | `POST api/todos`                | Creates a new todo         |
|`Todo`         | `PUT api/todos{id}`             | Updates a todo             |
|`void`         | `DELETE api/todos/{id}`         | Deletes a todo             |

## How to run
Demo Site Coming Soon.


## How to build
Run the backend with Spring boot on a Java compatible server. <br>
Then run the frontend from the ngTodo directory with Angular CLI.
